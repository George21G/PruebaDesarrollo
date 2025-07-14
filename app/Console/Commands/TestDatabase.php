<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestDatabase extends Command
{
    protected $signature = 'test:database';
    protected $description = 'Test database connection and basic queries';

    public function handle()
    {
        $this->info('Testing database connection...');
        
        try {
            // Probar conexión básica
            DB::connection()->getPdo();
            $this->info('✓ Database connection successful');
            
            // Probar consulta simple
            $userCount = DB::table('users')->count();
            $this->info("✓ Users table accessible: {$userCount} users");
            
            // Probar consulta de entidades
            $entidadCount = DB::table('entidades')->count();
            $this->info("✓ Entidades table accessible: {$entidadCount} entidades");
            
            // Probar consulta de usuarios biblioteca
            $usuarioCount = DB::table('usuarios_biblioteca')->count();
            $this->info("✓ Usuarios biblioteca table accessible: {$usuarioCount} usuarios");
            
            $this->info('All database tests passed!');
            
        } catch (\Exception $e) {
            $this->error('Database test failed: ' . $e->getMessage());
        }
    }
} 