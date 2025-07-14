<?php

namespace App\Http\Controllers;

use App\Models\UsuarioBiblioteca;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        // Configurar idioma español para el paginador
        app()->setLocale('es');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = UsuarioBiblioteca::with('user', 'entidad');
        
        // Aplicar búsqueda si se proporciona
        if ($request->filled('q')) {
            $searchTerm = $request->get('q');
            $query->where(function($q) use ($searchTerm) {
                $q->where('nombre', 'like', "%{$searchTerm}%")
                  ->orWhere('apellido', 'like', "%{$searchTerm}%")
                  ->orWhere('tipo_usuario', 'like', "%{$searchTerm}%")
                  ->orWhereHas('user', function($userQuery) use ($searchTerm) {
                      $userQuery->where('email', 'like', "%{$searchTerm}%");
                  });
            });
        }
        
        $usuarios = $query->orderBy('nombre')->paginate(10);

        // Obtener entidades disponibles (optimizadas)
        $entidades = \App\Models\Entidad::select('id', 'nombre')
            ->orderBy('nombre')
            ->limit(50)
            ->get();
        
        return Inertia::render('users/index', [
            'usuarios' => $usuarios,
            'entidades' => $entidades,
            'filters' => $request->only(['q'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtener entidades disponibles con límite y optimización
        $entidades = \App\Models\Entidad::select('id', 'nombre', 'tipo')
            ->orderBy('nombre')
            ->limit(100)
            ->get();
        
        return Inertia::render('users/create', [
            'entidades' => $entidades
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'tipo_usuario' => 'required|in:colegio,universidad,empresa,natural',
            'entidad_id' => $request->tipo_usuario === 'natural' ? 'nullable' : 'required|exists:entidades,id',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:500',
        ]);

        // Crear usuario en la tabla users
        $user = User::create([
            'name' => $request->nombre . ' ' . $request->apellido,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Generar código de usuario único
        $codigoUsuario = $this->generarCodigoUsuario($request->tipo_usuario);
        
        // Crear usuario de biblioteca
        UsuarioBiblioteca::create([
            'user_id' => $user->id,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'codigo_usuario' => $codigoUsuario,
            'tipo_usuario' => $request->tipo_usuario,
            'entidad_id' => $request->entidad_id,
            'telefono' => $request->telefono,
            'direccion' => $request->direccion,
        ]);

        return redirect()->route('users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UsuarioBiblioteca $usuario)
    {
        $usuario->load('user', 'entidad');
        
        return Inertia::render('users/show', [
            'usuario' => $usuario
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UsuarioBiblioteca $usuario)
    {
        $usuario->load('user', 'entidad');
        
        return Inertia::render('users/edit', [
            'usuario' => $usuario
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UsuarioBiblioteca $usuario)
    {
        try {
            // Log inicial para diagnosticar
            \Log::info('Iniciando actualización de usuario HTTP', [
                'usuario_biblioteca_id' => $usuario->id,
                'user_id' => $usuario->user_id,
                'usuario_attributes' => $usuario->getAttributes(),
                'request_method' => $request->method(),
                'request_url' => $request->url(),
                'request_headers' => $request->headers->all()
            ]);

            // Obtener el usuario directamente sin usar la relación
            $user = \App\Models\User::find($usuario->user_id);
            
            if (!$user) {
                \Log::error('Usuario no encontrado en la tabla users', [
                    'usuario_biblioteca_id' => $usuario->id,
                    'user_id' => $usuario->user_id
                ]);
                return back()->withErrors(['error' => 'Usuario no encontrado en el sistema']);
            }

            // Log para diagnosticar
            \Log::info('Datos recibidos para actualizar usuario:', [
                'usuario_id' => $usuario->id,
                'user_id' => $usuario->user_id,
                'email_actual' => $user->email,
                'email_nuevo' => $request->email,
                'datos_recibidos' => $request->all()
            ]);

            // Validación personalizada para el email
            $emailRules = ['required', 'email'];
            if ($request->email !== $user->email) {
                $emailRules[] = 'unique:users,email,' . $usuario->user_id . ',id';
            }

            $request->validate([
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'email' => $emailRules,
                'tipo_usuario' => 'required|in:colegio,universidad,empresa,natural',
                'entidad_id' => $request->tipo_usuario === 'natural' ? 'nullable' : 'required|exists:entidades,id',
                'telefono' => 'nullable|string|max:20',
                'direccion' => 'nullable|string|max:500',
            ]);

            // Actualizar usuario en la tabla users
            $user->update([
                'name' => $request->nombre . ' ' . $request->apellido,
                'email' => $request->email,
            ]);

            // Actualizar usuario de biblioteca
            $usuario->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'tipo_usuario' => $request->tipo_usuario,
                'entidad_id' => $request->entidad_id,
                'telefono' => $request->telefono,
                'direccion' => $request->direccion,
            ]);

            \Log::info('Usuario actualizado exitosamente', [
                'usuario_id' => $usuario->id,
                'user_id' => $usuario->user_id
            ]);

            return redirect()->route('users.index')
                ->with('success', 'Usuario actualizado exitosamente.');
                
        } catch (\Exception $e) {
            \Log::error('Error al actualizar usuario', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'usuario_id' => $usuario->id ?? 'unknown'
            ]);
            
            return back()->withErrors(['error' => 'Error interno del servidor: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UsuarioBiblioteca $usuario)
    {
        // Eliminar usuario de la tabla users también
        $usuario->user->delete();
        $usuario->delete();

        return redirect()->route('users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }

    /**
     * Search users
     */
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $tipo_usuario = $request->get('tipo_usuario', '');
        
        $usuarios = UsuarioBiblioteca::with('user', 'entidad')
            ->when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->where('nombre', 'like', "%{$query}%")
                         ->orWhere('apellido', 'like', "%{$query}%")
                         ->orWhereHas('user', function ($userQ) use ($query) {
                             $userQ->where('email', 'like', "%{$query}%");
                         });
                });
            })
            ->when($tipo_usuario, function ($q) use ($tipo_usuario) {
                $q->where('tipo_usuario', $tipo_usuario);
            })
            ->paginate(10);

        return Inertia::render('users/search', [
            'usuarios' => $usuarios,
            'filters' => [
                'q' => $query,
                'tipo_usuario' => $tipo_usuario
            ]
        ]);
    }

    /**
     * Generar código de usuario único
     */
    private function generarCodigoUsuario($tipoUsuario)
    {
        $prefix = strtoupper(substr($tipoUsuario, 0, 3)); // COL, UNI, EMP, NAT
        $year = date('Y');
        $random = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        
        $codigo = "{$prefix}{$year}{$random}";
        
        // Verificar que el código sea único
        while (UsuarioBiblioteca::where('codigo_usuario', $codigo)->exists()) {
            $random = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $codigo = "{$prefix}{$year}{$random}";
        }
        
        return $codigo;
    }
}
