<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->decimal('deposito', 10, 2)->default(0)->after('multa');
            $table->integer('renovaciones_realizadas')->default(0)->after('deposito');
            $table->boolean('puede_renovar')->default(true)->after('renovaciones_realizadas');
            $table->foreignId('usuario_biblioteca_id')->nullable()->after('user_id')->constrained('usuarios_biblioteca')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->dropForeign(['usuario_biblioteca_id']);
            $table->dropColumn(['deposito', 'renovaciones_realizadas', 'puede_renovar', 'usuario_biblioteca_id']);
        });
    }
};
