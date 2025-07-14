<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstitutionController extends Controller
{
    public function __construct()
    {
        // Configurar idioma español para el paginador
        app()->setLocale('es');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = $request->get('q', '');
        
        $institutions = Entidad::when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->where('nombre', 'like', "%{$query}%")
                         ->orWhere('direccion', 'like', "%{$query}%")
                         ->orWhere('telefono', 'like', "%{$query}%")
                         ->orWhere('email', 'like', "%{$query}%")
                         ->orWhere('tipo', 'like', "%{$query}%")
                         ->orWhere('descripcion', 'like', "%{$query}%");
                });
            })
            ->orderBy('nombre', 'asc')
            ->paginate(10)
            ->withQueryString();

        // Estadísticas por tipo
        $stats = [
            'total' => Entidad::count(),
            'colegios' => Entidad::where('tipo', 'colegio')->count(),
            'universidades' => Entidad::where('tipo', 'universidad')->count(),
            'empresas' => Entidad::where('tipo', 'empresa')->count(),
            'naturales' => Entidad::where('tipo', 'natural')->count(),
        ];

        return Inertia::render('institutions/index', [
            'institutions' => $institutions,
            'stats' => $stats,
            'filters' => [
                'q' => $query
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('institutions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:colegio,universidad,empresa,natural',
            'direccion' => 'required|string|max:500',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'responsable' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:1000',
        ]);

        Entidad::create($validated);

        return redirect()->route('institutions.index')
            ->with('success', 'Institución creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entidad $institution): Response
    {
        return Inertia::render('institutions/show', [
            'institution' => $institution,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entidad $institution): Response
    {
        return Inertia::render('institutions/edit', [
            'institution' => $institution,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entidad $institution)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:colegio,universidad,empresa,natural',
            'direccion' => 'required|string|max:500',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'responsable' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:1000',
        ]);

        $institution->update($validated);

        return redirect()->route('institutions.index')
            ->with('success', 'Institución actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entidad $institution)
    {
        // Verificar si hay usuarios asociados
        $userCount = $institution->usuariosBiblioteca()->count();
        
        if ($userCount > 0) {
            return back()->with('error', "No se puede eliminar la institución porque tiene {$userCount} usuarios asociados.");
        }

        $institution->delete();

        return redirect()->route('institutions.index')
            ->with('success', 'Institución eliminada exitosamente.');
    }
} 