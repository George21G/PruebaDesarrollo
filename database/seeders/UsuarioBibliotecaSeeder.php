<?php

namespace Database\Seeders;

use App\Models\UsuarioBiblioteca;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsuarioBibliotecaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Deshabilitar temporalmente las claves foráneas
        DB::statement('PRAGMA foreign_keys = OFF;');
        
        $usuarios = [
            // Universidad Nacional de Colombia (entidad_id: 1)
            [
                'user_id' => 3,
                'entidad_id' => 1,
                'codigo_usuario' => 'UNAL001',
                'nombre' => 'Ana Sofía',
                'apellido' => 'Martínez',
                'email' => 'ana.martinez@unal.edu.co',
                'telefono' => '3001112233',
                'direccion' => 'Carrera 45 #26-85, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 4,
                'entidad_id' => 1,
                'codigo_usuario' => 'UNAL002',
                'nombre' => 'Luis Fernando',
                'apellido' => 'Herrera',
                'email' => 'luis.herrera@unal.edu.co',
                'telefono' => '3002223344',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 5,
                'entidad_id' => 1,
                'codigo_usuario' => 'UNAL003',
                'nombre' => 'Carmen Elena',
                'apellido' => 'Vargas',
                'email' => 'carmen.vargas@unal.edu.co',
                'telefono' => '3003334455',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 6,
                'entidad_id' => 1,
                'codigo_usuario' => 'UNAL004',
                'nombre' => 'Roberto',
                'apellido' => 'Jiménez',
                'email' => 'roberto.jimenez@unal.edu.co',
                'telefono' => '3004445566',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            
            // Colegio San Ignacio (entidad_id: 2)
            [
                'user_id' => 7,
                'entidad_id' => 2,
                'codigo_usuario' => 'CSI001',
                'nombre' => 'Patricia',
                'apellido' => 'López',
                'email' => 'patricia.lopez@sanignacio.edu.co',
                'telefono' => '3005556677',
                'direccion' => 'Calle 74 #9-24, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 8,
                'entidad_id' => 2,
                'codigo_usuario' => 'CSI002',
                'nombre' => 'Diego Alejandro',
                'apellido' => 'Silva',
                'email' => 'diego.silva@sanignacio.edu.co',
                'telefono' => '3006667788',
                'direccion' => 'Calle 202 #54-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 9,
                'entidad_id' => 2,
                'codigo_usuario' => 'CSI003',
                'nombre' => 'Sandra Milena',
                'apellido' => 'Ruiz',
                'email' => 'sandra.ruiz@sanignacio.edu.co',
                'telefono' => '3007778899',
                'direccion' => 'Calle 15 #28-38, Cali',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 10,
                'entidad_id' => 2,
                'codigo_usuario' => 'CSI004',
                'nombre' => 'Andrés Felipe',
                'apellido' => 'Morales',
                'email' => 'andres.morales@sanignacio.edu.co',
                'telefono' => '3008889900',
                'direccion' => 'Carrera 7 #40-62, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            
            // Empresa Tecnológica Innovadora (entidad_id: 3)
            [
                'user_id' => 11,
                'entidad_id' => 3,
                'codigo_usuario' => 'ETI001',
                'nombre' => 'Laura Cristina',
                'apellido' => 'Díaz',
                'email' => 'laura.diaz@eti.com.co',
                'telefono' => '3009990011',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 12,
                'entidad_id' => 3,
                'codigo_usuario' => 'ETI002',
                'nombre' => 'Juan Pablo',
                'apellido' => 'Restrepo',
                'email' => 'juan.restrepo@eti.com.co',
                'telefono' => '3010001122',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 13,
                'entidad_id' => 3,
                'codigo_usuario' => 'ETI003',
                'nombre' => 'Mónica Andrea',
                'apellido' => 'Castro',
                'email' => 'monica.castro@eti.com.co',
                'telefono' => '3011112233',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 14,
                'entidad_id' => 3,
                'codigo_usuario' => 'ETI004',
                'nombre' => 'Ricardo Alberto',
                'apellido' => 'Mendoza',
                'email' => 'ricardo.mendoza@eti.com.co',
                'telefono' => '3012223344',
                'direccion' => 'Calle 74 #9-24, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            
            // Universidad de los Andes (entidad_id: 4)
            [
                'user_id' => 15,
                'entidad_id' => 4,
                'codigo_usuario' => 'UNI001',
                'nombre' => 'Isabella',
                'apellido' => 'Camacho',
                'email' => 'isabella.camacho@uniandes.edu.co',
                'telefono' => '3013334455',
                'direccion' => 'Calle 202 #54-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 16,
                'entidad_id' => 4,
                'codigo_usuario' => 'UNI002',
                'nombre' => 'Sebastián David',
                'apellido' => 'Ortiz',
                'email' => 'sebastian.ortiz@uniandes.edu.co',
                'telefono' => '3014445566',
                'direccion' => 'Calle 15 #28-38, Cali',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 17,
                'entidad_id' => 4,
                'codigo_usuario' => 'UNI003',
                'nombre' => 'Valentina',
                'apellido' => 'Sánchez',
                'email' => 'valentina.sanchez@uniandes.edu.co',
                'telefono' => '3015556677',
                'direccion' => 'Carrera 7 #40-62, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 18,
                'entidad_id' => 4,
                'codigo_usuario' => 'UNI004',
                'nombre' => 'Daniel Esteban',
                'apellido' => 'Ramírez',
                'email' => 'daniel.ramirez@uniandes.edu.co',
                'telefono' => '3016667788',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            
            // Colegio Gimnasio Moderno (entidad_id: 5)
            [
                'user_id' => 19,
                'entidad_id' => 5,
                'codigo_usuario' => 'GM001',
                'nombre' => 'Carolina Andrea',
                'apellido' => 'Mejía',
                'email' => 'carolina.mejia@gimnasiomoderno.edu.co',
                'telefono' => '3017778899',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 20,
                'entidad_id' => 5,
                'codigo_usuario' => 'GM002',
                'nombre' => 'Felipe José',
                'apellido' => 'Gutiérrez',
                'email' => 'felipe.gutierrez@gimnasiomoderno.edu.co',
                'telefono' => '3018889900',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 21,
                'entidad_id' => 5,
                'codigo_usuario' => 'GM003',
                'nombre' => 'Natalia Sofía',
                'apellido' => 'Rojas',
                'email' => 'natalia.rojas@gimnasiomoderno.edu.co',
                'telefono' => '3019990011',
                'direccion' => 'Calle 74 #9-24, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 22,
                'entidad_id' => 5,
                'codigo_usuario' => 'GM004',
                'nombre' => 'Miguel Ángel',
                'apellido' => 'Torres',
                'email' => 'miguel.torres@gimnasiomoderno.edu.co',
                'telefono' => '3020001122',
                'direccion' => 'Calle 202 #54-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            
            // Corporación Industrial del Valle (entidad_id: 6)
            [
                'user_id' => 23,
                'entidad_id' => 6,
                'codigo_usuario' => 'CIV001',
                'nombre' => 'Adriana Marcela',
                'apellido' => 'Valencia',
                'email' => 'adriana.valencia@civ.com.co',
                'telefono' => '3021112233',
                'direccion' => 'Calle 15 #28-38, Cali',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 24,
                'entidad_id' => 6,
                'codigo_usuario' => 'CIV002',
                'nombre' => 'Cristian Eduardo',
                'apellido' => 'Parra',
                'email' => 'cristian.parra@civ.com.co',
                'telefono' => '3022223344',
                'direccion' => 'Carrera 7 #40-62, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 25,
                'entidad_id' => 6,
                'codigo_usuario' => 'CIV003',
                'nombre' => 'Diana Marcela',
                'apellido' => 'Acosta',
                'email' => 'diana.acosta@civ.com.co',
                'telefono' => '3023334455',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 26,
                'entidad_id' => 6,
                'codigo_usuario' => 'CIV004',
                'nombre' => 'Eduardo José',
                'apellido' => 'Moreno',
                'email' => 'eduardo.moreno@civ.com.co',
                'telefono' => '3024445566',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            
            // Universidad Javeriana (entidad_id: 7)
            [
                'user_id' => 27,
                'entidad_id' => 7,
                'codigo_usuario' => 'JAV001',
                'nombre' => 'Gabriela Alejandra',
                'apellido' => 'Pineda',
                'email' => 'gabriela.pineda@javeriana.edu.co',
                'telefono' => '3025556677',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 28,
                'entidad_id' => 7,
                'codigo_usuario' => 'JAV002',
                'nombre' => 'Héctor Manuel',
                'apellido' => 'Vega',
                'email' => 'hector.vega@javeriana.edu.co',
                'telefono' => '3026667788',
                'direccion' => 'Calle 74 #9-24, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 29,
                'entidad_id' => 7,
                'codigo_usuario' => 'JAV003',
                'nombre' => 'Ingrid Marcela',
                'apellido' => 'Franco',
                'email' => 'ingrid.franco@javeriana.edu.co',
                'telefono' => '3027778899',
                'direccion' => 'Calle 202 #54-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 30,
                'entidad_id' => 7,
                'codigo_usuario' => 'JAV004',
                'nombre' => 'Jorge Luis',
                'apellido' => 'Medina',
                'email' => 'jorge.medina@javeriana.edu.co',
                'telefono' => '3028889900',
                'direccion' => 'Calle 15 #28-38, Cali',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            
            // Colegio Nueva Granada (entidad_id: 8)
            [
                'user_id' => 31,
                'entidad_id' => 8,
                'codigo_usuario' => 'CNG001',
                'nombre' => 'Katherine Andrea',
                'apellido' => 'Guzmán',
                'email' => 'katherine.guzman@cng.edu',
                'telefono' => '3029990011',
                'direccion' => 'Carrera 7 #40-62, Bogotá D.C.',
                'tipo_usuario' => 'empleado',
                'estado' => 'activo'
            ],
            [
                'user_id' => 32,
                'entidad_id' => 8,
                'codigo_usuario' => 'CNG002',
                'nombre' => 'Leonardo Fabio',
                'apellido' => 'Ríos',
                'email' => 'leonardo.rios@cng.edu',
                'telefono' => '3030001122',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 33,
                'entidad_id' => 8,
                'codigo_usuario' => 'CNG003',
                'nombre' => 'María Fernanda',
                'apellido' => 'Sosa',
                'email' => 'maria.sosa@cng.edu',
                'telefono' => '3031112233',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
            [
                'user_id' => 34,
                'entidad_id' => 8,
                'codigo_usuario' => 'CNG004',
                'nombre' => 'Nicolás Alejandro',
                'apellido' => 'Cárdenas',
                'email' => 'nicolas.cardenas@cng.edu',
                'telefono' => '3032223344',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'tipo_usuario' => 'estudiante',
                'estado' => 'activo'
            ],
        ];

        foreach ($usuarios as $usuario) {
            UsuarioBiblioteca::create($usuario);
        }
        
        // Rehabilitar las claves foráneas
        DB::statement('PRAGMA foreign_keys = ON;');
    }
}
