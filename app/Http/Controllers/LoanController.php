<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use App\Models\Libro;
use App\Models\UsuarioBiblioteca;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Entidad;

class LoanController extends Controller
{
    public function __construct()
    {
        // Configurar idioma español para el paginador
        app()->setLocale('es');
    }

    /**
     * Listar y filtrar préstamos
     */
    public function index(Request $request)
    {
        $estado = $request->get('estado');
        $prestamos = Prestamo::with(['libro', 'usuarioBiblioteca.entidad'])
            ->when($estado && $estado !== 'todos', fn($q) => $q->where('estado', $estado))
            ->orderByDesc('created_at')
            ->paginate(10);
        $stats = [
            'total' => Prestamo::count(),
            'prestados' => Prestamo::where('estado', 'activo')->count(),
            'devueltos' => Prestamo::where('estado', 'devuelto')->count(),
            'vencidos' => Prestamo::where('estado', 'vencido')->count(),
        ];
        $usuarios = UsuarioBiblioteca::with('entidad')->get();
        $libros = Libro::where('cantidad_total', '>', 0)->get();
        return Inertia::render('loans/index', [
            'prestamos' => $prestamos,
            'stats' => $stats,
            'filters' => [ 'estado' => $estado ],
            'usuarios' => $usuarios,
            'libros' => $libros,
        ]);
    }

    /**
     * Crear préstamo
     */
    public function store(Request $request)
    {
        $request->validate([
            'usuario_biblioteca_id' => 'required|exists:usuarios_biblioteca,id',
            'libro_id' => 'required|exists:libros,id',
            'fecha_prestamo' => 'required|date',
            'observaciones' => 'nullable|string',
        ]);
        $usuario = UsuarioBiblioteca::findOrFail($request->usuario_biblioteca_id);
        $libro = Libro::findOrFail($request->libro_id);
        // Validar máximo 3 préstamos activos
        $prestamosActivos = $usuario->prestamos()->where('estado', 'activo')->count();
        if ($prestamosActivos >= 3) {
            return back()->withErrors(['usuario_biblioteca_id' => 'El usuario ya tiene el máximo de 3 préstamos activos.']);
        }
        // Validar libro disponible
        if ($libro->cantidad_disponible <= 0) {
            return back()->withErrors(['libro_id' => 'El libro no está disponible para préstamo.']);
        }
        // Calcular fechas
        $fecha_prestamo = $request->fecha_prestamo;
        $fecha_devolucion_esperada = date('Y-m-d', strtotime("$fecha_prestamo +15 days"));
        // Depósito solo para persona natural
        $deposito = $usuario->esPersonaNatural() ? 15000 : 0;
        // Crear préstamo
        DB::transaction(function() use ($usuario, $libro, $fecha_prestamo, $fecha_devolucion_esperada, $request, $deposito) {
            Prestamo::create([
                'user_id' => $usuario->user_id,
                'usuario_biblioteca_id' => $usuario->id,
                'libro_id' => $libro->id,
                'fecha_prestamo' => $fecha_prestamo,
                'fecha_devolucion_esperada' => $fecha_devolucion_esperada,
                'estado' => 'activo',
                'multa' => 0,
                'deposito' => $deposito,
                'renovaciones_realizadas' => 0,
                'puede_renovar' => true,
                'observaciones' => $request->observaciones,
            ]);
            $libro->decrement('cantidad_disponible');
        });
        return redirect()->route('loans.index')->with('success', 'Préstamo creado exitosamente.');
    }

    /**
     * Mostrar el formulario para crear un nuevo préstamo.
     */
    public function create()
    {
        $entidades = Entidad::orderBy('nombre')->get();
        $libros = Libro::where('cantidad_disponible', '>', 0)->get();
        $usuarios = UsuarioBiblioteca::with('entidad')->get();
        
        return Inertia::render('loans/create', [
            'entidades' => $entidades,
            'libros' => $libros,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Mostrar un préstamo específico.
     */
    public function show(Prestamo $prestamo)
    {
        $prestamo->load('libro', 'user');
        
        return Inertia::render('loans/show', [
            'prestamo' => $prestamo
        ]);
    }

    /**
     * Mostrar el formulario para editar un préstamo existente.
     */
    public function edit(Prestamo $prestamo)
    {
        $prestamo->load('libro', 'user');
        $libros = Libro::all();
        $usuarios = UsuarioBiblioteca::with('user')->get();
        
        return Inertia::render('loans/edit', [
            'prestamo' => $prestamo,
            'libros' => $libros,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Actualizar un préstamo existente en el almacenamiento.
     */
    public function update(Request $request, Prestamo $prestamo)
    {
        $request->validate([
            'libro_id' => 'required|exists:libros,id',
            'user_id' => 'required|exists:users,id',
            'fecha_prestamo' => 'required|date',
            'fecha_devolucion_esperada' => 'required|date|after:fecha_prestamo',
            'fecha_devolucion_real' => 'nullable|date|after_or_equal:fecha_prestamo',
            'estado' => 'required|in:activo,devuelto,vencido,perdido',
            'multa' => 'required|numeric|min:0',
            'observaciones' => 'nullable|string',
        ]);

        // Si el estado cambia de activo a devuelto, incrementar ejemplares
        if ($prestamo->estado === 'activo' && $request->estado === 'devuelto') {
            $prestamo->libro->increment('cantidad_ejemplares');
        }

        // Si el estado cambia de devuelto a activo, decrementar ejemplares
        if ($prestamo->estado === 'devuelto' && $request->estado === 'activo') {
            $prestamo->libro->decrement('cantidad_ejemplares');
        }

        $prestamo->update($request->all());

        return redirect()->route('loans.index')
            ->with('success', 'Préstamo actualizado exitosamente.');
    }

    /**
     * Eliminar un préstamo específico del almacenamiento.
     */
    public function destroy(Prestamo $prestamo)
    {
        // Si el préstamo está activo, devolver el ejemplar
        if ($prestamo->estado === 'activo') {
            $prestamo->libro->increment('cantidad_ejemplares');
        }

        $prestamo->delete();

        return redirect()->route('loans.index')
            ->with('success', 'Préstamo eliminado exitosamente.');
    }

    /**
     * Renovar préstamo (solo una vez)
     */
    public function renovar(Prestamo $prestamo)
    {
        if (!$prestamo->puedeRenovar()) {
            return back()->withErrors(['error' => 'No se puede renovar este préstamo.']);
        }
        $prestamo->update([
            'fecha_devolucion_esperada' => $prestamo->fecha_devolucion_esperada->addDays(15),
            'renovaciones_realizadas' => $prestamo->renovaciones_realizadas + 1,
            'puede_renovar' => false,
        ]);
        return back()->with('success', 'Préstamo renovado correctamente.');
    }

    /**
     * Devolver préstamo y calcular multa si aplica
     */
    public function devolver(Prestamo $prestamo)
    {
        if ($prestamo->estado !== 'activo') {
            return back()->withErrors(['error' => 'El préstamo no está activo.']);
        }
        $usuario = $prestamo->usuarioBiblioteca;
        $fechaDevolucion = now();
        $multa = 0;
        if ($fechaDevolucion->gt($prestamo->fecha_devolucion_esperada) && $usuario && $usuario->esPersonaNatural()) {
            $diasRetraso = $fechaDevolucion->diffInDays($prestamo->fecha_devolucion_esperada);
            $multa = $diasRetraso * 2000;
        }
        $prestamo->update([
            'fecha_devolucion_real' => $fechaDevolucion,
            'estado' => $multa > 0 ? 'vencido' : 'devuelto',
            'multa' => $multa,
        ]);
        $prestamo->libro->increment('cantidad_disponible');
        return back()->with('success', 'Libro devuelto correctamente.' . ($multa > 0 ? " Multa: ".$multa : ''));
    }

    /**
     * Search loans
     */
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $estado = $request->get('estado', '');
        
        $prestamos = Prestamo::with('libro', 'usuario.user', 'usuario.entidad')
            ->when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->whereHas('libro', function ($libroQ) use ($query) {
                        $libroQ->where('titulo', 'like', "%{$query}%")
                               ->orWhere('autor', 'like', "%{$query}%");
                    })
                    ->orWhereHas('usuario', function ($usuarioQ) use ($query) {
                        $usuarioQ->where('nombre', 'like', "%{$query}%")
                                ->orWhere('apellido', 'like', "%{$query}%");
                    });
                });
            })
            ->when($estado, function ($q) use ($estado) {
                $q->where('estado', $estado);
            })
            ->paginate(10);

        return Inertia::render('loans/search', [
            'prestamos' => $prestamos,
            'filters' => [
                'q' => $query,
                'estado' => $estado
            ]
        ]);
    }

    /**
     * Get overdue loans
     */
    public function vencidos()
    {
        $prestamosVencidos = Prestamo::with('libro', 'usuario.user', 'usuario.entidad')
            ->where('estado', 'prestado')
            ->where('fecha_devolucion_esperada', '<', Carbon::now())
            ->paginate(10);

        return Inertia::render('loans/vencidos', [
            'prestamos' => $prestamosVencidos
        ]);
    }

    /**
     * Info de usuario para frontend
     */
    public function userInfo($usuario_biblioteca_id)
    {
        $usuario = UsuarioBiblioteca::with(['prestamos.libro'])->findOrFail($usuario_biblioteca_id);
        $prestados = $usuario->prestamos()->where('estado', 'activo')->with('libro')->get();
        $devueltos = $usuario->prestamos()->where('estado', 'devuelto')->with('libro')->get();
        $vencidos = $usuario->prestamos()->where('estado', 'vencido')->with('libro')->get();
        $librosDisponibles = Libro::where('cantidad_disponible', '>', 0)->get();
        return response()->json([
            'prestados' => $prestados,
            'devueltos' => $devueltos,
            'vencidos' => $vencidos,
            'libros_disponibles' => $librosDisponibles,
            'usuario' => $usuario,
        ]);
    }
}
