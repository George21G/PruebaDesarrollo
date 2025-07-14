<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Prestamo;
use App\Models\Libro;
use App\Models\UsuarioBiblioteca;
use Carbon\Carbon;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener algunos libros y usuarios para crear préstamos
        $libros = Libro::take(5)->get();
        $usuarios = UsuarioBiblioteca::take(3)->get();

        if ($libros->isEmpty() || $usuarios->isEmpty()) {
            $this->command->info('No hay libros o usuarios disponibles para crear préstamos.');
            return;
        }

        // Crear préstamos activos
        foreach ($libros->take(3) as $index => $libro) {
            $usuario = $usuarios[$index % $usuarios->count()];
            $fechaPrestamo = Carbon::now()->subDays(rand(1, 10));
            $fechaDevolucion = $fechaPrestamo->copy()->addDays(15);
            
            Prestamo::create([
                'user_id' => $usuario->user_id,
                'usuario_biblioteca_id' => $usuario->id,
                'libro_id' => $libro->id,
                'fecha_prestamo' => $fechaPrestamo,
                'fecha_devolucion_esperada' => $fechaDevolucion,
                'estado' => 'activo',
                'multa' => 0,
                'deposito' => $usuario->esPersonaNatural() ? 15000 : 0,
                'renovaciones_realizadas' => 0,
                'puede_renovar' => true,
                'observaciones' => 'Préstamo de prueba',
            ]);

            // Reducir cantidad de ejemplares disponibles
            $libro->decrement('cantidad_disponible');
        }

        // Crear préstamos devueltos
        if ($libros->count() > 3) {
            $libro = $libros[3];
            $usuario = $usuarios[0];
            $fechaPrestamo = Carbon::now()->subDays(20);
            $fechaDevolucion = $fechaPrestamo->copy()->addDays(15);
            $fechaDevolucionReal = $fechaDevolucion->copy()->addDays(2);

            Prestamo::create([
                'user_id' => $usuario->user_id,
                'usuario_biblioteca_id' => $usuario->id,
                'libro_id' => $libro->id,
                'fecha_prestamo' => $fechaPrestamo,
                'fecha_devolucion_esperada' => $fechaDevolucion,
                'fecha_devolucion_real' => $fechaDevolucionReal,
                'estado' => 'devuelto',
                'multa' => 0,
                'deposito' => $usuario->esPersonaNatural() ? 15000 : 0,
                'renovaciones_realizadas' => 0,
                'puede_renovar' => false,
                'observaciones' => 'Préstamo devuelto de prueba',
            ]);
        }

        // Crear préstamo vencido
        if ($libros->count() > 4) {
            $libro = $libros[4];
            $usuario = $usuarios[1];
            $fechaPrestamo = Carbon::now()->subDays(20);
            $fechaDevolucion = $fechaPrestamo->copy()->addDays(15);

            Prestamo::create([
                'user_id' => $usuario->user_id,
                'usuario_biblioteca_id' => $usuario->id,
                'libro_id' => $libro->id,
                'fecha_prestamo' => $fechaPrestamo,
                'fecha_devolucion_esperada' => $fechaDevolucion,
                'estado' => 'vencido',
                'multa' => $usuario->esPersonaNatural() ? 10000 : 0, // 5 días de retraso
                'deposito' => $usuario->esPersonaNatural() ? 15000 : 0,
                'renovaciones_realizadas' => 0,
                'puede_renovar' => false,
                'observaciones' => 'Préstamo vencido de prueba',
            ]);
        }

        $this->command->info('Préstamos de prueba creados exitosamente.');
    }
}
