<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Libro;
use App\Models\Prestamo;
use App\Models\Entidad;
use App\Models\UsuarioBiblioteca;

class CleanupSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar todas las tablas
        Prestamo::truncate();
        UsuarioBiblioteca::truncate();
        Libro::truncate();
        Entidad::truncate();
        
        // Mantener solo usuarios esenciales
        User::where('id', '>', 5)->delete();
        
        // Crear solo datos mínimos
        $this->createMinimalData();
    }
    
    private function createMinimalData()
    {
        // Crear solo 1 entidad
        $entidad = Entidad::create([
            'nombre' => 'Universidad Nacional',
            'tipo' => 'universidad',
            'direccion' => 'Calle 45 #26-85',
            'telefono' => '3001234567',
            'email' => 'contacto@unal.edu.co',
            'estado' => 'activo'
        ]);
        
        // Crear solo 3 libros
        $libros = [
            [
                'titulo' => 'El Quijote',
                'autor' => 'Miguel de Cervantes',
                'isbn' => '978-84-376-0494-7',
                'categoria' => 'Literatura',
                'anio_publicacion' => 1605,
                'editorial' => 'Editorial Planeta',
                'cantidad_ejemplares' => 5,
                'estado' => 'disponible'
            ],
            [
                'titulo' => 'Cien años de soledad',
                'autor' => 'Gabriel García Márquez',
                'isbn' => '978-84-397-2077-7',
                'categoria' => 'Literatura',
                'anio_publicacion' => 1967,
                'editorial' => 'Editorial Sudamericana',
                'cantidad_ejemplares' => 3,
                'estado' => 'disponible'
            ],
            [
                'titulo' => 'El Principito',
                'autor' => 'Antoine de Saint-Exupéry',
                'isbn' => '978-84-376-0494-8',
                'categoria' => 'Literatura Infantil',
                'anio_publicacion' => 1943,
                'editorial' => 'Gallimard',
                'cantidad_ejemplares' => 2,
                'estado' => 'disponible'
            ]
        ];
        
        foreach ($libros as $libro) {
            Libro::create($libro);
        }
        
        // Crear solo 2 usuarios de biblioteca
        $usuariosBiblioteca = [
            [
                'user_id' => 1,
                'entidad_id' => $entidad->id,
                'tipo_usuario' => 'estudiante',
                'numero_identificacion' => '123456789',
                'estado' => 'activo'
            ],
            [
                'user_id' => 2,
                'entidad_id' => $entidad->id,
                'tipo_usuario' => 'profesor',
                'numero_identificacion' => '987654321',
                'estado' => 'activo'
            ]
        ];
        
        foreach ($usuariosBiblioteca as $usuario) {
            UsuarioBiblioteca::create($usuario);
        }
        
        // Crear solo 1 préstamo de prueba
        Prestamo::create([
            'user_id' => 1,
            'libro_id' => 1,
            'fecha_prestamo' => now()->subDays(5),
            'fecha_devolucion_esperada' => now()->addDays(10),
            'fecha_devolucion_real' => null,
            'estado' => 'activo',
            'observaciones' => 'Préstamo de prueba',
            'multa' => 0
        ]);
    }
} 
 