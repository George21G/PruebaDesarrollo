import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building, ArrowLeft } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface Institution {
    id: number;
    nombre: string;
    tipo: string;
    direccion: string;
    telefono: string;
    email: string;
    responsable?: string;
    descripcion?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    institution: Institution;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Entidades', href: '/institutions' },
    { title: institution.nombre, href: `/institutions/${institution.id}` },
    { title: 'Editar', href: '#' },
];

export default function InstitutionsEdit({ institution }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: institution.nombre,
        tipo: institution.tipo,
        direccion: institution.direccion,
        telefono: institution.telefono,
        email: institution.email,
        responsable: institution.responsable || '',
        descripcion: institution.descripcion || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/institutions/${institution.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${institution.nombre}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={`/institutions/${institution.id}`}>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                                <Building className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">Editar Entidad</h1>
                                <p className="text-gray-400">
                                    Modifica la información de {institution.nombre}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Información de la Entidad
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Actualiza los campos que necesites modificar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="nombre" className="text-gray-300">Nombre de la Entidad *</Label>
                                    <Input
                                        id="nombre"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        placeholder="Ej: Universidad Nacional"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.nombre ? 'border-red-500' : ''}`}
                                    />
                                    {errors.nombre && (
                                        <p className="text-sm text-red-400">{errors.nombre}</p>
                                    )}
                                </div>

                                {/* Tipo */}
                                <div className="space-y-2">
                                    <Label htmlFor="tipo" className="text-gray-300">Tipo de Entidad *</Label>
                                    <Select value={data.tipo} onValueChange={(value) => setData('tipo', value)}>
                                        <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${errors.tipo ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                            <SelectItem value="colegio" className="text-white hover:bg-gray-700">Colegio</SelectItem>
                                            <SelectItem value="universidad" className="text-white hover:bg-gray-700">Universidad</SelectItem>
                                            <SelectItem value="empresa" className="text-white hover:bg-gray-700">Empresa</SelectItem>
                                            <SelectItem value="natural" className="text-white hover:bg-gray-700">Natural</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo && (
                                        <p className="text-sm text-red-400">{errors.tipo}</p>
                                    )}
                                </div>

                                {/* Dirección */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="direccion" className="text-gray-300">Dirección *</Label>
                                    <Input
                                        id="direccion"
                                        value={data.direccion}
                                        onChange={(e) => setData('direccion', e.target.value)}
                                        placeholder="Ej: Calle Principal 123, Ciudad"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.direccion ? 'border-red-500' : ''}`}
                                    />
                                    {errors.direccion && (
                                        <p className="text-sm text-red-400">{errors.direccion}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div className="space-y-2">
                                    <Label htmlFor="telefono" className="text-gray-300">Teléfono *</Label>
                                    <Input
                                        id="telefono"
                                        value={data.telefono}
                                        onChange={(e) => setData('telefono', e.target.value)}
                                        placeholder="Ej: +1234567890"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.telefono ? 'border-red-500' : ''}`}
                                    />
                                    {errors.telefono && (
                                        <p className="text-sm text-red-400">{errors.telefono}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Ej: contacto@entidad.edu"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Responsable */}
                                <div className="space-y-2">
                                    <Label htmlFor="responsable" className="text-gray-300">Responsable</Label>
                                    <Input
                                        id="responsable"
                                        value={data.responsable}
                                        onChange={(e) => setData('responsable', e.target.value)}
                                        placeholder="Ej: Dr. Juan Pérez"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.responsable ? 'border-red-500' : ''}`}
                                    />
                                    {errors.responsable && (
                                        <p className="text-sm text-red-400">{errors.responsable}</p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="descripcion" className="text-gray-300">Descripción</Label>
                                    <Textarea
                                        id="descripcion"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        placeholder="Descripción adicional de la entidad..."
                                        rows={4}
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${errors.descripcion ? 'border-red-500' : ''}`}
                                    />
                                    {errors.descripcion && (
                                        <p className="text-sm text-red-400">{errors.descripcion}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-800">
                                <Link href={`/institutions/${institution.id}`}>
                                    <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    {processing ? 'Actualizando...' : 'Actualizar Entidad'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 