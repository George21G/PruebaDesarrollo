import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/users',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

interface UsuarioBiblioteca {
    id: number;
    user_id: number;
    entidad_id: number;
    codigo_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    direccion?: string;
    tipo_usuario: string;
    estado: string;
}

interface Props {
    user: UsuarioBiblioteca;
}

export default function Edit({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        tipo_usuario: user.tipo_usuario,
        estado: user.estado,
    });

    useEffect(() => {
        if (data.tipo_usuario === 'natural') {
            setData('entidad_id', '');
        }
    }, [data.tipo_usuario]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    const tiposUsuario = [
        { value: 'colegio', label: 'Colegio' },
        { value: 'universidad', label: 'Universidad' },
        { value: 'empresa', label: 'Empresa' },
        { value: 'natural', label: 'Natural' },
    ];

    const estados = [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' },
        { value: 'suspendido', label: 'Suspendido' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${user.nombre} ${user.apellido}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.visit('/users')}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Editar Usuario
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Modificar información del usuario
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Información Personal */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>Información Personal</span>
                                </CardTitle>
                                <CardDescription>
                                    Datos personales del usuario
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="nombre">Nombre *</Label>
                                    <Input
                                        id="nombre"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        placeholder="Nombre del usuario"
                                        className={errors.nombre ? 'border-red-500' : ''}
                                    />
                                    {errors.nombre && (
                                        <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="apellido">Apellido *</Label>
                                    <Input
                                        id="apellido"
                                        value={data.apellido}
                                        onChange={(e) => setData('apellido', e.target.value)}
                                        placeholder="Apellido del usuario"
                                        className={errors.apellido ? 'border-red-500' : ''}
                                    />
                                    {errors.apellido && (
                                        <p className="text-sm text-red-500 mt-1">{errors.apellido}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@ejemplo.com"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input
                                        id="telefono"
                                        value={data.telefono}
                                        onChange={(e) => setData('telefono', e.target.value)}
                                        placeholder="Número de teléfono"
                                        className={errors.telefono ? 'border-red-500' : ''}
                                    />
                                    {errors.telefono && (
                                        <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="direccion">Dirección</Label>
                                    <Input
                                        id="direccion"
                                        value={data.direccion}
                                        onChange={(e) => setData('direccion', e.target.value)}
                                        placeholder="Dirección completa"
                                        className={errors.direccion ? 'border-red-500' : ''}
                                    />
                                    {errors.direccion && (
                                        <p className="text-sm text-red-500 mt-1">{errors.direccion}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información Institucional */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Institucional</CardTitle>
                                <CardDescription>
                                    Datos de tipo de usuario y estado
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="tipo_usuario">Tipo de Usuario *</Label>
                                    <Select value={data.tipo_usuario} onValueChange={(value) => setData('tipo_usuario', value)}>
                                        <SelectTrigger className={errors.tipo_usuario ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Seleccionar tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tiposUsuario.map((tipo) => (
                                                <SelectItem key={tipo.value} value={tipo.value}>
                                                    {tipo.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo_usuario && (
                                        <p className="text-sm text-red-500 mt-1">{errors.tipo_usuario}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="estado">Estado *</Label>
                                    <Select value={data.estado} onValueChange={(value) => setData('estado', value)}>
                                        <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {estados.map((estado) => (
                                                <SelectItem key={estado.value} value={estado.value}>
                                                    {estado.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.estado && (
                                        <p className="text-sm text-red-500 mt-1">{errors.estado}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="codigo_usuario">Código de Usuario</Label>
                                    <Input
                                        id="codigo_usuario"
                                        value={user.codigo_usuario}
                                        disabled
                                        className="bg-gray-50 dark:bg-gray-800"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        El código de usuario no se puede modificar
                                    </p>
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/users')}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
} 