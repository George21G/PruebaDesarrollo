<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Step 1: Temporarily change tipo_usuario to VARCHAR to remove enum constraint
        Schema::table('usuarios_biblioteca', function (Blueprint $table) {
            $table->string('tipo_usuario')->change();
        });

        // Step 2: Update all old values to 'colegio'
        DB::statement("UPDATE usuarios_biblioteca SET tipo_usuario = 'colegio' WHERE tipo_usuario NOT IN ('colegio', 'universidad', 'empresa')");

        // Step 3: Change back to ENUM with new allowed values
        Schema::table('usuarios_biblioteca', function (Blueprint $table) {
            $table->enum('tipo_usuario', ['colegio', 'universidad', 'empresa'])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback needed as we're just updating data and structure
    }
};
