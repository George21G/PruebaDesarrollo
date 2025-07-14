<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ejecutar los seeders en orden correcto
        $this->call([
            UserSeeder::class,
            EntidadSeeder::class,
            UsuarioBibliotecaSeeder::class,
            LibroSeeder::class,
            PrestamoSeeder::class,
        ]);
    }
}
