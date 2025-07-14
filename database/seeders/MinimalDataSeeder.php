<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Libro;
use App\Models\Prestamo;
use App\Models\Entidad;
use App\Models\UsuarioBiblioteca;
use Illuminate\Support\Facades\Hash;

class MinimalDataSeeder extends Seeder
{
    public function run(): void
    {
        // Desactivar claves foráneas en SQLite
        \DB::statement('PRAGMA foreign_keys = OFF;');

        // Crear solo 1 usuario administrador si no existe
        $admin = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        
        // Crear solo 1 entidad si no existe
        $entidad = Entidad::firstOrCreate(
            ['nombre' => 'Universidad Nacional'],
            [
                'tipo' => 'universidad',
                'direccion' => 'Calle 45 #26-85',
                'telefono' => '3001234567',
                'email' => 'contacto@unal.edu.co',
                'estado' => 'activo'
            ]
        );
        
        // Crear solo 2 libros si no existen
        Libro::firstOrCreate(
            ['isbn' => '978-84-376-0494-7'],
            [
                'titulo' => 'El Quijote',
                'autor' => 'Miguel de Cervantes',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Planeta',
                'cantidad_total' => 5,
                'cantidad_disponible' => 5,
                'estado' => 'disponible',
                'ubicacion' => 'Estante A1'
            ]
        );
        
        Libro::firstOrCreate(
            ['isbn' => '978-84-397-2077-7'],
            [
                'titulo' => 'Cien años de soledad',
                'autor' => 'Gabriel García Márquez',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Sudamericana',
                'cantidad_total' => 3,
                'cantidad_disponible' => 3,
                'estado' => 'disponible',
                'ubicacion' => 'Estante A2'
            ]
        );
        
        // Crear solo 1 usuario de biblioteca si no existe
        UsuarioBiblioteca::firstOrCreate(
            [
                'user_id' => $admin->id,
                'codigo_usuario' => 'U0001',
            ],
            [
                'entidad_id' => $entidad->id,
                'nombre' => 'Administrador',
                'apellido' => 'Principal',
                'email' => 'admin@test.com',
                'telefono' => '3001234567',
                'direccion' => 'Calle 45 #26-85',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ]
        );
        
        echo "Datos mínimos creados/verificados exitosamente!\n";
        echo "Usuario: admin@test.com\n";
        echo "Contraseña: password\n";

        // Reactivar claves foráneas
        \DB::statement('PRAGMA foreign_keys = ON;');
    }
} 
 