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
        // Update all old user types to 'colegio' using raw SQL
        DB::statement("UPDATE usuarios_biblioteca SET tipo_usuario = 'colegio' WHERE tipo_usuario NOT IN ('colegio', 'universidad', 'empresa')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback needed as we're just updating data
    }
};
