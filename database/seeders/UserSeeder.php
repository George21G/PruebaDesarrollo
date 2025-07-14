<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = [
            // Administradores del sistema
            [ 'id' => 1, 'name' => 'María González', 'email' => 'maria.gonzalez@biblioteca.com', 'password' => Hash::make('admin123') ],
            [ 'id' => 2, 'name' => 'Carlos Rodríguez', 'email' => 'carlos.rodriguez@biblioteca.com', 'password' => Hash::make('admin123') ],
            
            // Usuarios de biblioteca - Universidad Nacional
            [ 'id' => 3, 'name' => 'Ana Sofía Martínez', 'email' => 'ana.martinez@unal.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 4, 'name' => 'Luis Fernando Herrera', 'email' => 'luis.herrera@unal.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 5, 'name' => 'Carmen Elena Vargas', 'email' => 'carmen.vargas@unal.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 6, 'name' => 'Roberto Jiménez', 'email' => 'roberto.jimenez@unal.edu.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Colegio San Ignacio
            [ 'id' => 7, 'name' => 'Patricia López', 'email' => 'patricia.lopez@sanignacio.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 8, 'name' => 'Diego Alejandro Silva', 'email' => 'diego.silva@sanignacio.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 9, 'name' => 'Sandra Milena Ruiz', 'email' => 'sandra.ruiz@sanignacio.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 10, 'name' => 'Andrés Felipe Morales', 'email' => 'andres.morales@sanignacio.edu.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Empresa Tecnológica
            [ 'id' => 11, 'name' => 'Laura Cristina Díaz', 'email' => 'laura.diaz@eti.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 12, 'name' => 'Juan Pablo Restrepo', 'email' => 'juan.restrepo@eti.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 13, 'name' => 'Mónica Andrea Castro', 'email' => 'monica.castro@eti.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 14, 'name' => 'Ricardo Alberto Mendoza', 'email' => 'ricardo.mendoza@eti.com.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Universidad de los Andes
            [ 'id' => 15, 'name' => 'Isabella Camacho', 'email' => 'isabella.camacho@uniandes.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 16, 'name' => 'Sebastián David Ortiz', 'email' => 'sebastian.ortiz@uniandes.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 17, 'name' => 'Valentina Sánchez', 'email' => 'valentina.sanchez@uniandes.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 18, 'name' => 'Daniel Esteban Ramírez', 'email' => 'daniel.ramirez@uniandes.edu.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Colegio Gimnasio Moderno
            [ 'id' => 19, 'name' => 'Carolina Andrea Mejía', 'email' => 'carolina.mejia@gimnasiomoderno.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 20, 'name' => 'Felipe José Gutiérrez', 'email' => 'felipe.gutierrez@gimnasiomoderno.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 21, 'name' => 'Natalia Sofía Rojas', 'email' => 'natalia.rojas@gimnasiomoderno.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 22, 'name' => 'Miguel Ángel Torres', 'email' => 'miguel.torres@gimnasiomoderno.edu.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Corporación Industrial del Valle
            [ 'id' => 23, 'name' => 'Adriana Marcela Valencia', 'email' => 'adriana.valencia@civ.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 24, 'name' => 'Cristian Eduardo Parra', 'email' => 'cristian.parra@civ.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 25, 'name' => 'Diana Marcela Acosta', 'email' => 'diana.acosta@civ.com.co', 'password' => Hash::make('password') ],
            [ 'id' => 26, 'name' => 'Eduardo José Moreno', 'email' => 'eduardo.moreno@civ.com.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Universidad Javeriana
            [ 'id' => 27, 'name' => 'Gabriela Alejandra Pineda', 'email' => 'gabriela.pineda@javeriana.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 28, 'name' => 'Héctor Manuel Vega', 'email' => 'hector.vega@javeriana.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 29, 'name' => 'Ingrid Marcela Franco', 'email' => 'ingrid.franco@javeriana.edu.co', 'password' => Hash::make('password') ],
            [ 'id' => 30, 'name' => 'Jorge Luis Medina', 'email' => 'jorge.medina@javeriana.edu.co', 'password' => Hash::make('password') ],
            
            // Usuarios de biblioteca - Colegio Nueva Granada
            [ 'id' => 31, 'name' => 'Katherine Andrea Guzmán', 'email' => 'katherine.guzman@cng.edu', 'password' => Hash::make('password') ],
            [ 'id' => 32, 'name' => 'Leonardo Fabio Ríos', 'email' => 'leonardo.rios@cng.edu', 'password' => Hash::make('password') ],
            [ 'id' => 33, 'name' => 'María Fernanda Sosa', 'email' => 'maria.sosa@cng.edu', 'password' => Hash::make('password') ],
            [ 'id' => 34, 'name' => 'Nicolás Alejandro Cárdenas', 'email' => 'nicolas.cardenas@cng.edu', 'password' => Hash::make('password') ],
        ];

        foreach ($usuarios as $usuario) {
            User::create($usuario);
        }
    }
}
