<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entidad;

class EntidadSeeder extends Seeder
{
    public function run(): void
    {
        $entidades = [
            [
                'nombre' => 'Universidad Nacional de Colombia',
                'descripcion' => 'Institución de educación superior pública, la más grande del país',
                'tipo' => 'universidad',
                'direccion' => 'Carrera 45 #26-85, Bogotá D.C.',
                'telefono' => '3165000',
                'email' => 'contacto@unal.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio San Ignacio',
                'descripcion' => 'Institución educativa privada con más de 50 años de experiencia',
                'tipo' => 'colegio',
                'direccion' => 'Calle 72 #9-09, Bogotá D.C.',
                'telefono' => '2123456',
                'email' => 'info@sanignacio.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Empresa Tecnológica Innovadora S.A.',
                'descripcion' => 'Compañía dedicada al desarrollo de software y soluciones digitales',
                'tipo' => 'empresa',
                'direccion' => 'Carrera 7 #26-20, Bogotá D.C.',
                'telefono' => '6012345',
                'email' => 'contacto@eti.com.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Universidad de los Andes',
                'descripcion' => 'Universidad privada de alta calidad académica',
                'tipo' => 'universidad',
                'direccion' => 'Carrera 1 #18A-12, Bogotá D.C.',
                'telefono' => '3394949',
                'email' => 'info@uniandes.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio Gimnasio Moderno',
                'descripcion' => 'Institución educativa tradicional con enfoque en valores',
                'tipo' => 'colegio',
                'direccion' => 'Calle 74 #9-24, Bogotá D.C.',
                'telefono' => '5401888',
                'email' => 'admisiones@gimnasiomoderno.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Corporación Industrial del Valle',
                'descripcion' => 'Empresa manufacturera líder en el sector industrial',
                'tipo' => 'empresa',
                'direccion' => 'Calle 15 #28-38, Cali',
                'telefono' => '8854321',
                'email' => 'info@civ.com.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Universidad Javeriana',
                'descripcion' => 'Universidad privada con tradición jesuita',
                'tipo' => 'universidad',
                'direccion' => 'Carrera 7 #40-62, Bogotá D.C.',
                'telefono' => '3208320',
                'email' => 'contacto@javeriana.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio Nueva Granada',
                'descripcion' => 'Institución bilingüe con estándares internacionales',
                'tipo' => 'colegio',
                'direccion' => 'Calle 202 #54-20, Bogotá D.C.',
                'telefono' => '6681555',
                'email' => 'admissions@cng.edu',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Empresa de Servicios Públicos',
                'descripcion' => 'Compañía de servicios públicos municipales',
                'tipo' => 'empresa',
                'direccion' => 'Calle 10 #15-30, Medellín',
                'telefono' => '4444444',
                'email' => 'servicios@esp.com.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Universidad EAFIT',
                'descripcion' => 'Universidad privada con enfoque en ingeniería y administración',
                'tipo' => 'universidad',
                'direccion' => 'Carrera 49 #7 Sur-50, Medellín',
                'telefono' => '2619500',
                'email' => 'info@eafit.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio San Carlos',
                'descripcion' => 'Institución educativa con tradición católica',
                'tipo' => 'colegio',
                'direccion' => 'Calle 25 #12-45, Medellín',
                'telefono' => '5555555',
                'email' => 'info@sancarlos.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Juan Pérez',
                'descripcion' => 'Persona natural - Consultor independiente',
                'tipo' => 'natural',
                'direccion' => 'Calle 15 #20-30, Bogotá D.C.',
                'telefono' => '3001234567',
                'email' => 'juan.perez@email.com',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'María González',
                'descripcion' => 'Persona natural - Abogada independiente',
                'tipo' => 'natural',
                'direccion' => 'Carrera 50 #25-15, Cali',
                'telefono' => '3159876543',
                'email' => 'maria.gonzalez@email.com',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Empresa de Construcción ABC',
                'descripcion' => 'Compañía constructora con más de 20 años de experiencia',
                'tipo' => 'empresa',
                'direccion' => 'Calle 80 #15-20, Barranquilla',
                'telefono' => '7777777',
                'email' => 'construccion@abc.com.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Universidad del Norte',
                'descripcion' => 'Universidad privada de la costa caribe',
                'tipo' => 'universidad',
                'direccion' => 'Km 5 Vía Puerto Colombia, Barranquilla',
                'telefono' => '3509509',
                'email' => 'info@uninorte.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio Bilingüe Richmond',
                'descripcion' => 'Institución educativa bilingüe con enfoque internacional',
                'tipo' => 'colegio',
                'direccion' => 'Calle 85 #18-46, Bogotá D.C.',
                'telefono' => '6681555',
                'email' => 'info@richmond.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Carlos Rodríguez',
                'descripcion' => 'Persona natural - Médico especialista',
                'tipo' => 'natural',
                'direccion' => 'Calle 100 #15-25, Bogotá D.C.',
                'telefono' => '3201234567',
                'email' => 'carlos.rodriguez@email.com',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Empresa de Tecnología Digital',
                'descripcion' => 'Startup de tecnología enfocada en soluciones móviles',
                'tipo' => 'empresa',
                'direccion' => 'Calle 70 #10-15, Bogotá D.C.',
                'telefono' => '8888888',
                'email' => 'tech@digital.com.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Universidad del Rosario',
                'descripcion' => 'Universidad privada con más de 350 años de historia',
                'tipo' => 'universidad',
                'direccion' => 'Carrera 6 #12C-13, Bogotá D.C.',
                'telefono' => '2970200',
                'email' => 'info@urosario.edu.co',
                'estado' => 'activo',
            ],
            [
                'nombre' => 'Colegio San Bartolomé',
                'descripcion' => 'Institución educativa con tradición jesuita',
                'tipo' => 'colegio',
                'direccion' => 'Calle 73 #9-10, Bogotá D.C.',
                'telefono' => '2123456',
                'email' => 'info@sanbartolome.edu.co',
                'estado' => 'activo',
            ],
        ];

        foreach ($entidades as $entidad) {
            // Verificar si la entidad ya existe para evitar duplicados
            $existe = Entidad::where('nombre', $entidad['nombre'])->first();
            if (!$existe) {
                Entidad::create($entidad);
            }
        }
    }
}
