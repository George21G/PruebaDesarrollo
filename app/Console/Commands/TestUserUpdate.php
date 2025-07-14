<?php

namespace App\Console\Commands;

use App\Http\Controllers\UserController;
use App\Models\UsuarioBiblioteca;
use Illuminate\Console\Command;
use Illuminate\Http\Request;

class TestUserUpdate extends Command
{
    protected $signature = 'test:user-update';
    protected $description = 'Test user update functionality';

    public function handle()
    {
        $this->info('Testing user update...');
        
        $usuario = UsuarioBiblioteca::find(1);
        if (!$usuario) {
            $this->error('No UsuarioBiblioteca found with ID 1');
            return;
        }
        
        $this->info("UsuarioBiblioteca ID: {$usuario->id}");
        $this->info("User ID: {$usuario->user_id}");
        
        // Simular una petición
        $request = new Request([
            'nombre' => 'Admin Test',
            'apellido' => 'Sistema Test',
            'email' => 'admin@biblioteca.com',
            'tipo_usuario' => 'colegio',
            'entidad_id' => 1,
            'telefono' => '123456789',
            'direccion' => 'Test Address'
        ]);
        
        $controller = new UserController();
        
        try {
            $response = $controller->update($request, $usuario);
            $this->info('Update successful');
        } catch (\Exception $e) {
            $this->error('Update failed: ' . $e->getMessage());
            $this->error('Trace: ' . $e->getTraceAsString());
        }
    }
} 