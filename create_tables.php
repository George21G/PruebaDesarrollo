<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

try {
    // Crear tabla de migraciones
    Schema::create('migrations', function ($table) {
        $table->id();
        $table->string('migration');
        $table->integer('batch');
    });

    // Crear tabla de sesiones
    Schema::create('sessions', function ($table) {
        $table->string('id')->primary();
        $table->foreignId('user_id')->nullable()->index();
        $table->string('ip_address', 45)->nullable();
        $table->text('user_agent')->nullable();
        $table->longText('payload');
        $table->integer('last_activity')->index();
    });

    // Crear tabla de usuarios
    Schema::create('users', function ($table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });

    // Crear tabla de libros
    Schema::create('libros', function ($table) {
        $table->id();
        $table->string('titulo');
        $table->string('autor');
        $table->string('isbn')->unique()->nullable();
        $table->string('categoria');
        $table->string('editorial')->nullable();
        $table->integer('cantidad_total')->default(1);
        $table->integer('cantidad_disponible')->default(1);
        $table->enum('estado', ['disponible', 'prestado', 'mantenimiento', 'perdido'])->default('disponible');
        $table->string('ubicacion')->nullable();
        $table->timestamps();
    });

    // Crear tabla de entidades
    Schema::create('entidades', function ($table) {
        $table->id();
        $table->string('nombre');
        $table->string('tipo');
        $table->string('direccion');
        $table->string('telefono');
        $table->string('email');
        $table->string('responsable')->nullable();
        $table->text('descripcion')->nullable();
        $table->timestamps();
    });

    // Crear tabla de usuarios biblioteca
    Schema::create('usuarios_biblioteca', function ($table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('nombre');
        $table->string('apellido');
        $table->string('tipo_usuario');
        $table->foreignId('entidad_id')->constrained()->onDelete('cascade');
        $table->string('telefono')->nullable();
        $table->string('direccion')->nullable();
        $table->timestamps();
    });

    // Crear tabla de préstamos
    Schema::create('prestamos', function ($table) {
        $table->id();
        $table->foreignId('libro_id')->constrained()->onDelete('cascade');
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->date('fecha_prestamo');
        $table->date('fecha_devolucion_esperada');
        $table->date('fecha_devolucion_real')->nullable();
        $table->string('estado');
        $table->decimal('multa', 8, 2)->default(0);
        $table->text('observaciones')->nullable();
        $table->timestamps();
    });

    echo "Tablas creadas exitosamente!\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
} 
 
 