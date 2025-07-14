<?php

namespace App\Http\Controllers;

use App\Models\Libro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
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
        $query = $request->get('q', '');
        
        $libros = Libro::when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->where('titulo', 'like', "%{$query}%")
                         ->orWhere('autor', 'like', "%{$query}%")
                         ->orWhere('isbn', 'like', "%{$query}%")
                         ->orWhere('editorial', 'like', "%{$query}%")
                         ->orWhere('categoria', 'like', "%{$query}%");
                });
            })
            ->orderBy('titulo', 'asc')
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('books/index', [
            'libros' => $libros,
            'filters' => [
                'q' => $query
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('books/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20|unique:libros',
            'categoria' => 'required|string|max:100',
            'editorial' => 'nullable|string|max:255',
            'cantidad_total' => 'required|integer|min:1',
            'cantidad_disponible' => 'required|integer|min:0',
            'estado' => 'required|in:disponible,prestado,mantenimiento,perdido',
            'ubicacion' => 'nullable|string|max:255',
        ]);

        $libro = Libro::create($request->all());

        return redirect()->route('books.index')
            ->with('success', 'Libro agregado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $libro = Libro::findOrFail($id);
        return Inertia::render('books/show', [
            'libro' => $libro
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $libro = Libro::findOrFail($id);
        return Inertia::render('books/edit', [
            'libro' => $libro
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $libro = Libro::findOrFail($id);
        
        // Log para diagnosticar
        \Log::info('Datos recibidos para actualizar libro:', [
            'libro_id' => $libro->id,
            'datos_recibidos' => $request->all(),
            'metodo' => $request->method(),
            'url' => $request->url()
        ]);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20|unique:libros,isbn,' . $libro->id . ',id',
            'categoria' => 'required|string|max:100',
            'editorial' => 'nullable|string|max:255',
            'cantidad_total' => 'required|integer|min:1',
            'cantidad_disponible' => 'required|integer|min:0|lte:cantidad_total',
            'estado' => 'required|in:disponible,prestado,mantenimiento,perdido',
            'ubicacion' => 'nullable|string|max:255',
        ]);

        // Log antes de actualizar
        \Log::info('Libro antes de actualizar:', $libro->toArray());

        $libro->update($request->all());

        // Log después de actualizar
        \Log::info('Libro después de actualizar:', $libro->fresh()->toArray());

        return redirect()->route('books.index')
            ->with('success', 'Libro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $libro = Libro::findOrFail($id);
        $titulo = $libro->titulo;
        $libro->delete();

        return redirect()->route('books.index')
            ->with('success', "Libro '{$titulo}' eliminado exitosamente.");
    }

    /**
     * Search books
     */
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $categoria = $request->get('categoria', '');
        
        $libros = Libro::when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->where('titulo', 'like', "%{$query}%")
                         ->orWhere('autor', 'like', "%{$query}%")
                         ->orWhere('isbn', 'like', "%{$query}%")
                         ->orWhere('editorial', 'like', "%{$query}%");
                });
            })
            ->when($categoria && $categoria !== 'todas', function ($q) use ($categoria) {
                $q->where('categoria', $categoria);
            })
            ->orderBy('titulo', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('books/search', [
            'libros' => $libros,
            'filters' => [
                'q' => $query,
                'categoria' => $categoria
            ]
        ]);
    }
}
