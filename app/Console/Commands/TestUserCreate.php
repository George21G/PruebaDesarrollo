<?php

namespace App\Console\Commands;

use App\Http\Controllers\UserController;
use App\Models\Entidad;
use Illuminate\Console\Command;
use Illuminate\Http\Request;

class TestUserCreate extends Command
{
    protected $signature = 'test:user-create';
    protected $description = 'Test user creation functionality';

    public function handle()
    {
        $this->info('Testing user creation...');
        
        // Verificar entidades disponibles
        $entidades = Entidad::select('id', 'nombre', 'tipo')->get();
        $this->info("Entidades disponibles: {$entidades->count()}");
        
        foreach ($entidades as $entidad) {
            $this->info("- {$entidad->id}: {$entidad->nombre} ({$entidad->tipo})");
        }
        
        // Simular una petición de creación
        $request = new Request([
            'nombre' => 'Usuario Test',
            'apellido' => 'Apellido Test',
            'email' => 'test@biblioteca.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'tipo_usuario' => 'colegio',
            'entidad_id' => $entidades->first()->id,
            'telefono' => '123456789',
            'direccion' => 'Dirección Test'
        ]);
        
        $controller = new UserController();
        
        try {
            $response = $controller->store($request);
            $this->info('User creation successful');
        } catch (\Exception $e) {
            $this->error('User creation failed: ' . $e->getMessage());
        }
    }
} 