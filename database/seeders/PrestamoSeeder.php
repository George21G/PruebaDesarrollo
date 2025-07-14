<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prestamo;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PrestamoSeeder extends Seeder
{
    public function run(): void
    {
        // Deshabilitar temporalmente las claves foráneas
        DB::statement('PRAGMA foreign_keys = OFF;');
        
        $prestamos = [
            // Préstamos activos (no devueltos aún)
            [
                'user_id' => 3, // Ana Sofía Martínez
                'libro_id' => 1, // Cien años de soledad
                'fecha_prestamo' => Carbon::now()->subDays(5),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(10),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Préstamo regular',
                'multa' => 0,
            ],
            [
                'user_id' => 7, // Patricia López
                'libro_id' => 4, // Clean Code
                'fecha_prestamo' => Carbon::now()->subDays(3),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(12),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Para proyecto de desarrollo',
                'multa' => 0,
            ],
            [
                'user_id' => 15, // Isabella Camacho
                'libro_id' => 7, // Historia de Colombia
                'fecha_prestamo' => Carbon::now()->subDays(1),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(14),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Investigación académica',
                'multa' => 0,
            ],
            
            // Préstamos devueltos a tiempo
            [
                'user_id' => 8, // Diego Alejandro Silva
                'libro_id' => 2, // El amor en los tiempos del cólera
                'fecha_prestamo' => Carbon::now()->subDays(20),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(5),
                'fecha_devolucion_real' => Carbon::now()->subDays(6),
                'estado' => 'devuelto',
                'observaciones' => 'Devuelto en buen estado',
                'multa' => 0,
            ],
            [
                'user_id' => 11, // Laura Cristina Díaz
                'libro_id' => 5, // Design Patterns
                'fecha_prestamo' => Carbon::now()->subDays(25),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(10),
                'fecha_devolucion_real' => Carbon::now()->subDays(11),
                'estado' => 'devuelto',
                'observaciones' => 'Libro en excelente estado',
                'multa' => 0,
            ],
            [
                'user_id' => 19, // Carolina Andrea Mejía
                'libro_id' => 9, // El mundo de Sofía
                'fecha_prestamo' => Carbon::now()->subDays(30),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(15),
                'fecha_devolucion_real' => Carbon::now()->subDays(16),
                'estado' => 'devuelto',
                'observaciones' => 'Devuelto con un día de retraso',
                'multa' => 5000, // 5,000 pesos de multa
            ],
            
            // Préstamos vencidos
            [
                'user_id' => 12, // Juan Pablo Restrepo
                'libro_id' => 3, // La vorágine
                'fecha_prestamo' => Carbon::now()->subDays(40),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(15),
                'fecha_devolucion_real' => null,
                'estado' => 'vencido',
                'observaciones' => 'Préstamo vencido, sin devolución',
                'multa' => 15000, // 15,000 pesos de multa
            ],
            [
                'user_id' => 16, // Sebastián David Ortiz
                'libro_id' => 6, // The Pragmatic Programmer
                'fecha_prestamo' => Carbon::now()->subDays(35),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(10),
                'fecha_devolucion_real' => null,
                'estado' => 'vencido',
                'observaciones' => 'Libro muy solicitado, vencido',
                'multa' => 12000, // 12,000 pesos de multa
            ],
            
            // Préstamos perdidos
            [
                'user_id' => 23, // Adriana Marcela Valencia
                'libro_id' => 8, // Colombia: Una nación a pesar de sí misma
                'fecha_prestamo' => Carbon::now()->subDays(60),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(30),
                'fecha_devolucion_real' => null,
                'estado' => 'perdido',
                'observaciones' => 'Libro reportado como perdido',
                'multa' => 50000, // 50,000 pesos de multa por pérdida
            ],
            
            // Más préstamos devueltos
            [
                'user_id' => 4, // Luis Fernando Herrera
                'libro_id' => 10, // El origen de las especies
                'fecha_prestamo' => Carbon::now()->subDays(45),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(20),
                'fecha_devolucion_real' => Carbon::now()->subDays(21),
                'estado' => 'devuelto',
                'observaciones' => 'Devuelto con un día de retraso',
                'multa' => 5000,
            ],
            [
                'user_id' => 9, // Sandra Milena Ruiz
                'libro_id' => 11, // Breve historia del tiempo
                'fecha_prestamo' => Carbon::now()->subDays(50),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(25),
                'fecha_devolucion_real' => Carbon::now()->subDays(26),
                'estado' => 'devuelto',
                'observaciones' => 'Devuelto en perfecto estado',
                'multa' => 5000,
            ],
            [
                'user_id' => 13, // Mónica Andrea Castro
                'libro_id' => 12, // Así habló Zaratustra
                'fecha_prestamo' => Carbon::now()->subDays(55),
                'fecha_devolucion_esperada' => Carbon::now()->subDays(30),
                'fecha_devolucion_real' => Carbon::now()->subDays(31),
                'estado' => 'devuelto',
                'observaciones' => 'Devuelto con un día de retraso',
                'multa' => 5000,
            ],
            
            // Préstamos recientes
            [
                'user_id' => 5, // Carmen Elena Vargas
                'libro_id' => 13, // La riqueza de las naciones
                'fecha_prestamo' => Carbon::now()->subDays(2),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(13),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Para curso de economía',
                'multa' => 0,
            ],
            [
                'user_id' => 17, // Valentina Sánchez
                'libro_id' => 14, // El capital
                'fecha_prestamo' => Carbon::now()->subDays(4),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(11),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Investigación comparativa',
                'multa' => 0,
            ],
            [
                'user_id' => 21, // Natalia Sofía Rojas
                'libro_id' => 15, // El hombre en busca de sentido
                'fecha_prestamo' => Carbon::now()->subDays(6),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(9),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Lectura personal',
                'multa' => 0,
            ],
            [
                'user_id' => 25, // Diana Marcela Acosta
                'libro_id' => 16, // Psicología y alquimia
                'fecha_prestamo' => Carbon::now()->subDays(8),
                'fecha_devolucion_esperada' => Carbon::now()->addDays(7),
                'fecha_devolucion_real' => null,
                'estado' => 'activo',
                'observaciones' => 'Estudio de psicología',
                'multa' => 0,
            ],
        ];

        foreach ($prestamos as $prestamo) {
            Prestamo::create($prestamo);
        }
        
        // Rehabilitar las claves foráneas
        DB::statement('PRAGMA foreign_keys = ON;');
    }
}
