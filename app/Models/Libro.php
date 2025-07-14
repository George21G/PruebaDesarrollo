<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Libro extends Model
{
    protected $fillable = [
        'titulo',
        'autor',
        'isbn',
        'categoria',
        'editorial',
        'cantidad_total',
        'cantidad_disponible',
        'estado',
        'ubicacion'
    ];

    protected $casts = [
        'cantidad_total' => 'integer',
        'cantidad_disponible' => 'integer',
        'estado' => 'string'
    ];

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }

    public function entidad(): BelongsTo
    {
        return $this->belongsTo(Entidad::class);
    }

    public function scopeDisponible($query)
    {
        return $query->where('estado', 'disponible')->where('cantidad_disponible', '>', 0);
    }
}
