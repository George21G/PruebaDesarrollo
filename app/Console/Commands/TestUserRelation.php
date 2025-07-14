<?php

namespace App\Console\Commands;

use App\Models\UsuarioBiblioteca;
use Illuminate\Console\Command;

class TestUserRelation extends Command
{
    protected $signature = 'test:user-relation';
    protected $description = 'Test the relationship between UsuarioBiblioteca and User';

    public function handle()
    {
        $this->info('Testing user relationship...');
        
        $usuario = UsuarioBiblioteca::find(1);
        if (!$usuario) {
            $this->error('No UsuarioBiblioteca found with ID 1');
            return;
        }
        
        $this->info("UsuarioBiblioteca ID: {$usuario->id}");
        $this->info("User ID: {$usuario->user_id}");
        
        $usuario->load('user');
        
        $this->info("User relation loaded: " . ($usuario->relationLoaded('user') ? 'Yes' : 'No'));
        $this->info("User object exists: " . ($usuario->user ? 'Yes' : 'No'));
        
        if ($usuario->user) {
            $this->info("User email: {$usuario->user->email}");
        }
    }
} 