<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UsuarioBiblioteca extends Model
{
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function entidad(): BelongsTo
    {
        return $this->belongsTo(Entidad::class);
    }

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class, 'user_id', 'user_id');
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
