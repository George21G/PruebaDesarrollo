<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entidad extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'tipo',
        'direccion',
        'telefono',
        'email',
        'estado'
    ];

    protected $casts = [
        'estado' => 'string'
    ];

    public function libros(): HasMany
    {
        return $this->hasMany(Libro::class);
    }

    public function usuariosBiblioteca(): HasMany
    {
        return $this->hasMany(UsuarioBiblioteca::class);
    }
}
