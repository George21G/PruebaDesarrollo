<?php

namespace App\Console\Commands;

use App\Models\UsuarioBiblioteca;
use Illuminate\Console\Command;

class ShowTestUsers extends Command
{
    protected $signature = 'show:test-users';
    protected $description = 'Show test users created';

    public function handle()
    {
        $this->info('Usuarios de prueba creados:');
        $this->info('========================');
        
        $usuarios = UsuarioBiblioteca::with('user', 'entidad')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
        
        foreach ($usuarios as $usuario) {
            $this->info("Código: {$usuario->codigo_usuario}");
            $this->info("Nombre: {$usuario->nombre} {$usuario->apellido}");
            $this->info("Email: {$usuario->email}");
            $this->info("Tipo: {$usuario->tipo_usuario}");
            $this->info("Entidad: {$usuario->entidad->nombre}");
            $this->info("Teléfono: {$usuario->telefono}");
            $this->info("Dirección: {$usuario->direccion}");
            $this->info("---");
        }
        
        $this->info("Total usuarios: " . UsuarioBiblioteca::count());
        $this->info("Colegios: " . UsuarioBiblioteca::where('tipo_usuario', 'colegio')->count());
        $this->info("Universidades: " . UsuarioBiblioteca::where('tipo_usuario', 'universidad')->count());
        $this->info("Empresas: " . UsuarioBiblioteca::where('tipo_usuario', 'empresa')->count());
    }
} 