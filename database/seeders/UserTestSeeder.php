<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UsuarioBiblioteca;
use App\Models\Entidad;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener entidades disponibles
        $entidades = Entidad::all();
        
        // Datos de usuarios de prueba
        $usuariosPrueba = [
            // Colegios
            [
                'nombre' => 'María',
                'apellido' => 'González',
                'email' => 'maria.gonzalez@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3001234567',
                'direccion' => 'Calle 45 # 12-34, Bogotá'
            ],
            [
                'nombre' => 'Carlos',
                'apellido' => 'Rodríguez',
                'email' => 'carlos.rodriguez@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3109876543',
                'direccion' => 'Carrera 78 # 23-45, Medellín'
            ],
            [
                'nombre' => 'Ana',
                'apellido' => 'Martínez',
                'email' => 'ana.martinez@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3154567890',
                'direccion' => 'Avenida 5 # 67-89, Cali'
            ],
            [
                'nombre' => 'Luis',
                'apellido' => 'Hernández',
                'email' => 'luis.hernandez@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3201234567',
                'direccion' => 'Calle 12 # 34-56, Barranquilla'
            ],
            [
                'nombre' => 'Sofia',
                'apellido' => 'López',
                'email' => 'sofia.lopez@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3259876543',
                'direccion' => 'Carrera 45 # 78-90, Bucaramanga'
            ],
            
            // Universidades
            [
                'nombre' => 'Diego',
                'apellido' => 'Pérez',
                'email' => 'diego.perez@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3301234567',
                'direccion' => 'Calle 67 # 12-34, Bogotá'
            ],
            [
                'nombre' => 'Valentina',
                'apellido' => 'García',
                'email' => 'valentina.garcia@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3359876543',
                'direccion' => 'Carrera 23 # 45-67, Medellín'
            ],
            [
                'nombre' => 'Andrés',
                'apellido' => 'Moreno',
                'email' => 'andres.moreno@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3401234567',
                'direccion' => 'Avenida 8 # 90-12, Cali'
            ],
            [
                'nombre' => 'Camila',
                'apellido' => 'Jiménez',
                'email' => 'camila.jimenez@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3459876543',
                'direccion' => 'Calle 34 # 56-78, Barranquilla'
            ],
            [
                'nombre' => 'Juan',
                'apellido' => 'Torres',
                'email' => 'juan.torres@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3501234567',
                'direccion' => 'Carrera 90 # 12-34, Bucaramanga'
            ],
            
            // Empresas
            [
                'nombre' => 'Laura',
                'apellido' => 'Vargas',
                'email' => 'laura.vargas@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3551234567',
                'direccion' => 'Calle 89 # 23-45, Bogotá'
            ],
            [
                'nombre' => 'Roberto',
                'apellido' => 'Silva',
                'email' => 'roberto.silva@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3609876543',
                'direccion' => 'Carrera 56 # 78-90, Medellín'
            ],
            [
                'nombre' => 'Patricia',
                'apellido' => 'Rojas',
                'email' => 'patricia.rojas@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3651234567',
                'direccion' => 'Avenida 12 # 34-56, Cali'
            ],
            [
                'nombre' => 'Fernando',
                'apellido' => 'Castro',
                'email' => 'fernando.castro@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3709876543',
                'direccion' => 'Calle 78 # 90-12, Barranquilla'
            ],
            [
                'nombre' => 'Diana',
                'apellido' => 'Morales',
                'email' => 'diana.morales@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3751234567',
                'direccion' => 'Carrera 34 # 56-78, Bucaramanga'
            ],
            
            // Más usuarios variados
            [
                'nombre' => 'Ricardo',
                'apellido' => 'Ortiz',
                'email' => 'ricardo.ortiz@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3801234567',
                'direccion' => 'Calle 90 # 12-34, Pereira'
            ],
            [
                'nombre' => 'Natalia',
                'apellido' => 'Flores',
                'email' => 'natalia.flores@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '3859876543',
                'direccion' => 'Carrera 67 # 89-01, Manizales'
            ],
            [
                'nombre' => 'Gabriel',
                'apellido' => 'Reyes',
                'email' => 'gabriel.reyes@empresa.com',
                'password' => 'password123',
                'tipo_usuario' => 'empresa',
                'entidad_id' => $entidades->where('tipo', 'empresa')->first()->id,
                'telefono' => '3901234567',
                'direccion' => 'Avenida 15 # 23-45, Ibagué'
            ],
            [
                'nombre' => 'Isabella',
                'apellido' => 'Cruz',
                'email' => 'isabella.cruz@colegio.edu',
                'password' => 'password123',
                'tipo_usuario' => 'colegio',
                'entidad_id' => $entidades->where('tipo', 'colegio')->first()->id,
                'telefono' => '3959876543',
                'direccion' => 'Calle 45 # 67-89, Villavicencio'
            ],
            [
                'nombre' => 'Alejandro',
                'apellido' => 'Mendoza',
                'email' => 'alejandro.mendoza@universidad.edu',
                'password' => 'password123',
                'tipo_usuario' => 'universidad',
                'entidad_id' => $entidades->where('tipo', 'universidad')->first()->id,
                'telefono' => '4001234567',
                'direccion' => 'Carrera 12 # 34-56, Neiva'
            ]
        ];

        // Crear usuarios
        foreach ($usuariosPrueba as $usuarioData) {
            // Crear usuario en la tabla users
            $user = User::create([
                'name' => $usuarioData['nombre'] . ' ' . $usuarioData['apellido'],
                'email' => $usuarioData['email'],
                'password' => Hash::make($usuarioData['password']),
            ]);

            // Generar código de usuario único
            $codigoUsuario = $this->generarCodigoUsuario($usuarioData['tipo_usuario']);

            // Crear usuario de biblioteca
            UsuarioBiblioteca::create([
                'user_id' => $user->id,
                'nombre' => $usuarioData['nombre'],
                'apellido' => $usuarioData['apellido'],
                'email' => $usuarioData['email'],
                'codigo_usuario' => $codigoUsuario,
                'tipo_usuario' => $usuarioData['tipo_usuario'],
                'entidad_id' => $usuarioData['entidad_id'],
                'telefono' => $usuarioData['telefono'],
                'direccion' => $usuarioData['direccion'],
            ]);
        }

        $this->command->info('20 usuarios de prueba creados exitosamente!');
    }

    /**
     * Generar código de usuario único
     */
    private function generarCodigoUsuario($tipoUsuario)
    {
        $prefix = strtoupper(substr($tipoUsuario, 0, 3)); // COL, UNI, EMP
        $year = date('Y');
        $random = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        
        $codigo = "{$prefix}{$year}{$random}";
        
        // Verificar que el código sea único
        while (UsuarioBiblioteca::where('codigo_usuario', $codigo)->exists()) {
            $random = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $codigo = "{$prefix}{$year}{$random}";
        }
        
        return $codigo;
    }
} 