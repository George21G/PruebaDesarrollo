<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prestamo extends Model
{
    protected $fillable = [
        'user_id',
        'usuario_biblioteca_id',
        'libro_id',
        'fecha_prestamo',
        'fecha_devolucion_esperada',
        'fecha_devolucion_real',
        'estado',
        'observaciones',
        'multa',
        'deposito',
        'renovaciones_realizadas',
        'puede_renovar',
    ];

    protected $casts = [
        'fecha_prestamo' => 'date',
        'fecha_devolucion_esperada' => 'date',
        'fecha_devolucion_real' => 'date',
        'estado' => 'string',
        'multa' => 'decimal:2',
        'deposito' => 'decimal:2',
        'puede_renovar' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function usuarioBiblioteca(): BelongsTo
    {
        return $this->belongsTo(UsuarioBiblioteca::class, 'usuario_biblioteca_id');
    }

    public function libro(): BelongsTo
    {
        return $this->belongsTo(Libro::class);
    }

    public function scopeActivo($query)
    {
        return $query->where('estado', 'activo');
    }

    public function scopeDevuelto($query)
    {
        return $query->where('estado', 'devuelto');
    }

    public function scopeVencido($query)
    {
        return $query->where('estado', 'vencido');
    }

    public function puedeRenovar(): bool
    {
        return $this->renovaciones_realizadas < 1 && $this->estado === 'activo' && $this->puede_renovar;
    }
}
