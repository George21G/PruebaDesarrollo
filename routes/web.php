<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\InstitutionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas de prueba para diagnosticar
Route::get('/test', function () {
    return response()->json(['message' => 'Test successful', 'time' => now()]);
});

Route::get('/test-users', [\App\Http\Controllers\TestController::class, 'users']);

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // Usar caché para estadísticas que no cambian frecuentemente
        $stats = cache()->remember('dashboard_stats', 300, function () {
            return [
                'total_libros' => \App\Models\Libro::count(),
                'libros_disponibles' => \App\Models\Libro::where('estado', 'disponible')->count(),
                'total_usuarios' => \App\Models\UsuarioBiblioteca::count(),
                'prestamos_activos' => \App\Models\Prestamo::where('estado', 'activo')->count(),
                'prestamos_vencidos' => \App\Models\Prestamo::where('estado', 'activo')
                    ->where('fecha_devolucion_esperada', '<', now())->count(),
                'total_entidades' => \App\Models\Entidad::count(),
                'entidades_por_tipo' => [
                    'colegios' => \App\Models\Entidad::where('tipo', 'colegio')->count(),
                    'universidades' => \App\Models\Entidad::where('tipo', 'universidad')->count(),
                    'empresas' => \App\Models\Entidad::where('tipo', 'empresa')->count(),
                    'naturales' => \App\Models\Entidad::where('tipo', 'natural')->count(),
                ],
                // Datos para gráficas
                'libros_por_categoria' => \App\Models\Libro::selectRaw('categoria, COUNT(*) as total')
                    ->groupBy('categoria')
                    ->orderBy('total', 'desc')
                    ->get()
                    ->map(function($item) {
                        return ['name' => $item->categoria, 'value' => $item->total];
                    }),
                'usuarios_por_tipo' => \App\Models\UsuarioBiblioteca::selectRaw('tipo_usuario, COUNT(*) as total')
                    ->groupBy('tipo_usuario')
                    ->orderBy('total', 'desc')
                    ->get()
                    ->map(function($item) {
                        return ['name' => ucfirst($item->tipo_usuario), 'value' => $item->total];
                    }),
                'entidades_por_tipo' => \App\Models\Entidad::selectRaw('tipo, COUNT(*) as total')
                    ->groupBy('tipo')
                    ->orderBy('total', 'desc')
                    ->get()
                    ->map(function($item) {
                        return ['name' => ucfirst($item->tipo), 'value' => $item->total];
                    }),
                'prestamos_por_estado' => \App\Models\Prestamo::selectRaw('estado, COUNT(*) as total')
                    ->groupBy('estado')
                    ->orderBy('total', 'desc')
                    ->get()
                    ->map(function($item) {
                        $estadoLabels = [
                            'activo' => 'Prestados',
                            'devuelto' => 'Devueltos',
                            'vencido' => 'Vencidos'
                        ];
                        return ['name' => $estadoLabels[$item->estado] ?? ucfirst($item->estado), 'value' => $item->total];
                    }),
            ];
        });
        
        return Inertia::render('dashboard', $stats);
    })->name('dashboard');

    // Rutas para libros
    Route::resource('books', BookController::class);
    Route::get('books/search', [BookController::class, 'search'])->name('books.search');

    // Rutas para usuarios
    Route::resource('users', UserController::class);
    Route::get('users/search', [UserController::class, 'search'])->name('users.search');

    // Rutas para préstamos
    Route::resource('loans', LoanController::class);
    Route::get('loans/search', [LoanController::class, 'search'])->name('loans.search');
    Route::get('loans/vencidos', [LoanController::class, 'vencidos'])->name('loans.vencidos');
    Route::post('loans/{loan}/devolver', [LoanController::class, 'devolver'])->name('loans.devolver');
    Route::post('loans/{loan}/renew', [LoanController::class, 'renovar'])->name('loans.renovar');
    Route::get('loans/user-info/{usuario_biblioteca_id}', [LoanController::class, 'userInfo'])->name('loans.userInfo');

    // Rutas para instituciones
    Route::resource('institutions', InstitutionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
