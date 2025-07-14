<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UsuarioBiblioteca;
use App\Models\Entidad;

class RecreateUsuarioBibliotecaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users that don't have a corresponding record in usuarios_biblioteca
        $users = User::whereNotExists(function ($query) {
            $query->select(\DB::raw(1))
                  ->from('usuarios_biblioteca')
                  ->whereRaw('usuarios_biblioteca.user_id = users.id');
        })->get();

        // Get the first entidad to use as default
        $defaultEntidad = Entidad::first();
        
        if (!$defaultEntidad) {
            // Create a default entidad if none exists
            $defaultEntidad = Entidad::create([
                'nombre' => 'Entidad por Defecto',
                'tipo' => 'colegio',
                'direccion' => 'Dirección por defecto',
                'telefono' => '000-000-0000',
                'email' => 'default@entidad.com',
                'estado' => 'activo'
            ]);
        }

        foreach ($users as $user) {
            // Extract name parts
            $nameParts = explode(' ', $user->name, 2);
            $nombre = $nameParts[0] ?? '';
            $apellido = $nameParts[1] ?? '';

            UsuarioBiblioteca::create([
                'user_id' => $user->id,
                'entidad_id' => $defaultEntidad->id,
                'codigo_usuario' => 'USR' . str_pad($user->id, 4, '0', STR_PAD_LEFT),
                'nombre' => $nombre,
                'apellido' => $apellido,
                'email' => $user->email,
                'telefono' => null,
                'direccion' => null,
                'tipo_usuario' => 'colegio', // Default to colegio
                'estado' => 'activo',
            ]);
        }

        $this->command->info("Created " . $users->count() . " usuario_biblioteca records.");
    }
}
