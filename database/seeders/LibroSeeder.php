<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Libro;

class LibroSeeder extends Seeder
{
    public function run(): void
    {
        $libros = [
            // Literatura Colombiana
            [
                'titulo' => 'Cien años de soledad',
                'autor' => 'Gabriel García Márquez',
                'isbn' => '9788497592208',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 5,
                'cantidad_disponible' => 3,
                'estado' => 'disponible',
                'ubicacion' => 'Estante A1 - Literatura Colombiana',
            ],
            [
                'titulo' => 'El amor en los tiempos del cólera',
                'autor' => 'Gabriel García Márquez',
                'isbn' => '9788497592215',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante A1 - Literatura Colombiana',
            ],
            [
                'titulo' => 'La vorágine',
                'autor' => 'José Eustasio Rivera',
                'isbn' => '9789583001234',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Planeta',
                'cantidad_total' => 2,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante A1 - Literatura Colombiana',
            ],
            
            // Ciencias de la Computación
            [
                'titulo' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
                'autor' => 'Robert C. Martin',
                'isbn' => '9780132350884',
                'categoria' => 'Tecnología',
                'editorial' => 'Prentice Hall',
                'cantidad_total' => 4,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante B2 - Tecnología',
            ],
            [
                'titulo' => 'Design Patterns: Elements of Reusable Object-Oriented Software',
                'autor' => 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
                'isbn' => '9780201633610',
                'categoria' => 'Tecnología',
                'editorial' => 'Addison-Wesley',
                'cantidad_total' => 3,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante B2 - Tecnología',
            ],
            [
                'titulo' => 'The Pragmatic Programmer: Your Journey to Mastery',
                'autor' => 'Andrew Hunt, David Thomas',
                'isbn' => '9780135957059',
                'categoria' => 'Tecnología',
                'editorial' => 'Addison-Wesley',
                'cantidad_total' => 2,
                'cantidad_disponible' => 0,
                'estado' => 'prestado',
                'ubicacion' => 'Estante B2 - Tecnología',
            ],
            
            // Historia
            [
                'titulo' => 'Historia de Colombia: De la conquista a la independencia',
                'autor' => 'Jorge Orlando Melo',
                'isbn' => '9789583005678',
                'categoria' => 'Historia',
                'editorial' => 'Editorial Planeta',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante C3 - Historia',
            ],
            [
                'titulo' => 'Colombia: Una nación a pesar de sí misma',
                'autor' => 'David Bushnell',
                'isbn' => '9789583008901',
                'categoria' => 'Historia',
                'editorial' => 'Editorial Planeta',
                'cantidad_total' => 2,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante C3 - Historia',
            ],
            
            // Ciencias Naturales
            [
                'titulo' => 'El origen de las especies',
                'autor' => 'Charles Darwin',
                'isbn' => '9788497592345',
                'categoria' => 'Ciencias',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 2,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante D4 - Ciencias',
            ],
            [
                'titulo' => 'Breve historia del tiempo',
                'autor' => 'Stephen Hawking',
                'isbn' => '9788497592352',
                'categoria' => 'Ciencias',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante D4 - Ciencias',
            ],
            
            // Filosofía
            [
                'titulo' => 'El mundo de Sofía',
                'autor' => 'Jostein Gaarder',
                'isbn' => '9788497592369',
                'categoria' => 'Filosofía',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 4,
                'cantidad_disponible' => 3,
                'estado' => 'disponible',
                'ubicacion' => 'Estante E5 - Filosofía',
            ],
            [
                'titulo' => 'Así habló Zaratustra',
                'autor' => 'Friedrich Nietzsche',
                'isbn' => '9788497592376',
                'categoria' => 'Filosofía',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 2,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante E5 - Filosofía',
            ],
            
            // Economía
            [
                'titulo' => 'La riqueza de las naciones',
                'autor' => 'Adam Smith',
                'isbn' => '9788497592383',
                'categoria' => 'Economía',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 2,
                'cantidad_disponible' => 0,
                'estado' => 'prestado',
                'ubicacion' => 'Estante F6 - Economía',
            ],
            [
                'titulo' => 'El capital',
                'autor' => 'Karl Marx',
                'isbn' => '9788497592390',
                'categoria' => 'Economía',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante F6 - Economía',
            ],
            
            // Psicología
            [
                'titulo' => 'El hombre en busca de sentido',
                'autor' => 'Viktor E. Frankl',
                'isbn' => '9788497592406',
                'categoria' => 'Psicología',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante G7 - Psicología',
            ],
            [
                'titulo' => 'Psicología y alquimia',
                'autor' => 'Carl Gustav Jung',
                'isbn' => '9788497592413',
                'categoria' => 'Psicología',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 2,
                'cantidad_disponible' => 1,
                'estado' => 'disponible',
                'ubicacion' => 'Estante G7 - Psicología',
            ],
            
            // Literatura Universal
            [
                'titulo' => 'Don Quijote de la Mancha',
                'autor' => 'Miguel de Cervantes',
                'isbn' => '9788497592420',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 4,
                'cantidad_disponible' => 3,
                'estado' => 'disponible',
                'ubicacion' => 'Estante H8 - Literatura Universal',
            ],
            [
                'titulo' => '1984',
                'autor' => 'George Orwell',
                'isbn' => '9788497592437',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 2,
                'estado' => 'disponible',
                'ubicacion' => 'Estante H8 - Literatura Universal',
            ],
            [
                'titulo' => 'El señor de los anillos',
                'autor' => 'J.R.R. Tolkien',
                'isbn' => '9788497592444',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 5,
                'cantidad_disponible' => 4,
                'estado' => 'disponible',
                'ubicacion' => 'Estante H8 - Literatura Universal',
            ],
            
            // Libros en mantenimiento
            [
                'titulo' => 'Harry Potter y la piedra filosofal',
                'autor' => 'J.K. Rowling',
                'isbn' => '9788497592451',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 3,
                'cantidad_disponible' => 0,
                'estado' => 'mantenimiento',
                'ubicacion' => 'Estante H8 - Literatura Universal',
            ],
            
            // Libro perdido
            [
                'titulo' => 'El principito',
                'autor' => 'Antoine de Saint-Exupéry',
                'isbn' => '9788497592468',
                'categoria' => 'Literatura',
                'editorial' => 'Editorial Norma',
                'cantidad_total' => 2,
                'cantidad_disponible' => 0,
                'estado' => 'perdido',
                'ubicacion' => 'Estante H8 - Literatura Universal',
            ],
        ];

        foreach ($libros as $libro) {
            Libro::create($libro);
        }
    }
}
