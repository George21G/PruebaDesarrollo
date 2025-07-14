<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'message' => 'Test successful',
            'time' => now()
        ]);
    }

    public function users()
    {
        try {
            $usuarios = \App\Models\UsuarioBiblioteca::with('user', 'entidad')
                ->limit(5)
                ->get();
            
            return Inertia::render('users/index', [
                'usuarios' => [
                    'data' => $usuarios,
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => 5,
                    'total' => $usuarios->count()
                ],
                'entidades' => \App\Models\Entidad::select('id', 'nombre')->limit(10)->get()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
} 