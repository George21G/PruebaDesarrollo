import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { UserCog, Plus, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/users',
    },
    {
        title: 'Agregar Usuario',
        href: '/users/create',
    },
];

const tiposUsuario = [
    { value: 'colegio', label: 'Colegio' },
    { value: 'universidad', label: 'Universidad' },
    { value: 'empresa', label: 'Empresa' },
    { value: 'natural', label: 'Natural' },
];

interface Entidad {
    id: number;
    nombre: string;
    tipo: string;
}

interface Props {
    entidades: Entidad[];
}

export default function CreateUser({ entidades }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        password_confirmation: '',
        tipo_usuario: '',
        entidad_id: '',
        telefono: '',
        direccion: '',
    });

    useEffect(() => {
        if (data.tipo_usuario === 'natural') {
            setData('entidad_id', '');
        }
    }, [data.tipo_usuario]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Usuario" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
                            <Plus className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Agregar Nuevo Usuario
                            </h1>
                            <p className="text-gray-400">
                                Registra un nuevo usuario en el sistema
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Link href={route('users.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto w-full">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <UserCog className="h-5 w-5 mr-2" />
                                Información del Usuario
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Completa todos los campos requeridos para registrar el usuario
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="text-gray-300">
                                            Nombre *
                                        </Label>
                                        <Input
                                            id="nombre"
                                            type="text"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ingresa el nombre"
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-400 text-sm">{errors.nombre}</p>
                                        )}
                                    </div>

                                    {/* Apellido */}
                                    <div className="space-y-2">
                                        <Label htmlFor="apellido" className="text-gray-300">
                                            Apellido *
                                        </Label>
                                        <Input
                                            id="apellido"
                                            type="text"
                                            value={data.apellido}
                                            onChange={(e) => setData('apellido', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ingresa el apellido"
                                        />
                                        {errors.apellido && (
                                            <p className="text-red-400 text-sm">{errors.apellido}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-300">
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="usuario@ejemplo.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Tipo de Usuario */}
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo_usuario" className="text-gray-300">
                                            Tipo de Usuario *
                                        </Label>
                                        <Select value={data.tipo_usuario} onValueChange={(value) => setData('tipo_usuario', value)}>
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                <SelectValue placeholder="Selecciona el tipo de usuario" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {tiposUsuario.map((tipo) => (
                                                    <SelectItem key={tipo.value} value={tipo.value} className="text-white hover:bg-gray-700">
                                                        {tipo.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.tipo_usuario && (
                                            <p className="text-red-400 text-sm">{errors.tipo_usuario}</p>
                                        )}
                                    </div>

                                    {/* Contraseña */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-gray-300">
                                            Contraseña *
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                        {errors.password && (
                                            <p className="text-red-400 text-sm">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirmar Contraseña */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-gray-300">
                                            Confirmar Contraseña *
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Repite la contraseña"
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-red-400 text-sm">{errors.password_confirmation}</p>
                                        )}
                                    </div>

                                    {/* Entidad */}
                                    {data.tipo_usuario !== 'natural' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="entidad_id" className="text-gray-300">
                                                Entidad *
                                            </Label>
                                            <Select value={data.entidad_id} onValueChange={(value) => setData('entidad_id', value)}>
                                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectValue placeholder="Selecciona una entidad" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700">
                                                    {entidades.map((entidad) => (
                                                        <SelectItem key={entidad.id} value={entidad.id.toString()} className="text-white hover:bg-gray-700">
                                                            {entidad.nombre} ({entidad.tipo})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.entidad_id && (
                                                <p className="text-red-400 text-sm">{errors.entidad_id}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Teléfono */}
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono" className="text-gray-300">
                                            Teléfono
                                        </Label>
                                        <Input
                                            id="telefono"
                                            type="tel"
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="+1234567890"
                                        />
                                        {errors.telefono && (
                                            <p className="text-red-400 text-sm">{errors.telefono}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div className="space-y-2">
                                    <Label htmlFor="direccion" className="text-gray-300">
                                        Dirección
                                    </Label>
                                    <Textarea
                                        id="direccion"
                                        value={data.direccion}
                                        onChange={(e) => setData('direccion', e.target.value)}
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                                        placeholder="Ingresa la dirección completa (opcional)"
                                    />
                                    {errors.direccion && (
                                        <p className="text-red-400 text-sm">{errors.direccion}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        <Link href={route('users.index')}>
                                            Cancelar
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar Usuario'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 