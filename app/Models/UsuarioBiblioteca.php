<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UsuarioBiblioteca extends Model
{
    protected $table = 'usuarios_biblioteca';
    
    protected $fillable = [
        'user_id',
        'entidad_id',
        'codigo_usuario',
        'nombre',
        'apellido',
        'email',
        'telefono',
        'direccion',
        'tipo_usuario',
        'estado',
    ];

    protected $casts = [
        'tipo_usuario' => 'string',
        'estado' => 'string'
    ];

    /**
     * Tipos de usuario permitidos
     */
    const TIPOS = ['colegio', 'universidad', 'empresa'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function entidad(): BelongsTo
    {
        return $this->belongsTo(Entidad::class, 'entidad_id', 'id');
    }

    public function prestamos(): HasMany
    {
        // Relación por usuario_biblioteca_id
        return $this->hasMany(Prestamo::class, 'usuario_biblioteca_id', 'id');
    }

    public function esPersonaNatural(): bool
    {
        return $this->tipo_usuario === 'natural';
    }

    public function scopeActivo($query)
    {
        return $query->where('estado', 'activo');
    }

    public function scopeEstudiante($query)
    {
        return $query->where('tipo_usuario', 'estudiante');
    }

    public function scopeProfesor($query)
    {
        return $query->where('tipo_usuario', 'profesor');
    }

    public function getNombreCompletoAttribute()
    {
        return $this->nombre . ' ' . $this->apellido;
    }

    public function puedePrestarLibros()
    {
        return $this->estado === 'activo' && 
               $this->multa_acumulada <= 0 && 
               $this->prestamos()->activo()->count() < $this->max_libros_prestados;
    }
}
