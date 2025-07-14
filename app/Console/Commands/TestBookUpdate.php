<?php

namespace App\Console\Commands;

use App\Models\Libro;
use Illuminate\Console\Command;

class TestBookUpdate extends Command
{
    protected $signature = 'test:book-update {id}';
    protected $description = 'Probar actualización de libro';

    public function handle()
    {
        $id = $this->argument('id');
        
        $libro = Libro::find($id);
        if (!$libro) {
            $this->error("Libro con ID {$id} no encontrado");
            return 1;
        }

        $this->info("Libro encontrado: {$libro->titulo}");
        $this->info("Estado actual: {$libro->estado}");
        $this->info("Cantidad disponible: {$libro->cantidad_disponible}");

        // Intentar actualizar
        $datos = [
            'titulo' => $libro->titulo . ' (TEST)',
            'autor' => $libro->autor,
            'isbn' => $libro->isbn,
            'categoria' => $libro->categoria,
            'editorial' => $libro->editorial,
            'cantidad_total' => $libro->cantidad_total,
            'cantidad_disponible' => $libro->cantidad_disponible,
            'estado' => 'disponible',
            'ubicacion' => $libro->ubicacion
        ];

        $this->info("Intentando actualizar con datos:");
        foreach ($datos as $key => $value) {
            $this->line("  {$key}: {$value}");
        }

        try {
            $this->info("Antes de actualizar:");
            $this->line("  Título: {$libro->titulo}");
            $this->line("  Estado: {$libro->estado}");
            
            $libro->update($datos);
            
            // Recargar el modelo para ver los cambios
            $libro->refresh();
            
            $this->info("✅ Actualización exitosa");
            $this->info("Después de actualizar:");
            $this->line("  Título: {$libro->titulo}");
            $this->line("  Estado: {$libro->estado}");
        } catch (\Exception $e) {
            $this->error("❌ Error al actualizar: " . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 