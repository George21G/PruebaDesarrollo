import { Head } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, User, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/users',
    },
    {
        title: 'Detalle',
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
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    entidad: {
        id: number;
        nombre: string;
        tipo: string;
    };
}

interface Props {
    user: UsuarioBiblioteca;
}

export default function Show({ user }: Props) {
    const handleEdit = () => {
        router.visit(`/users/${user.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            router.delete(`/users/${user.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${user.nombre} ${user.apellido} - Detalle`} />
            
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
                                Detalle del Usuario
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Información completa del usuario
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={handleEdit} variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                        <Button onClick={handleDelete} variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                        </Button>
                    </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Personal Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Información Personal</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Nombre Completo
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.nombre} {user.apellido}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Código de Usuario
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.codigo_usuario}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Email
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.email}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Teléfono
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.telefono || 'No especificado'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Dirección
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.direccion || 'No especificada'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Institution Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building className="h-5 w-5" />
                                <span>Información Institucional</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tipo de Usuario
                                </label>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        user.tipo_usuario === 'estudiante' 
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            : user.tipo_usuario === 'empleado'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    }`}>
                                        {user.tipo_usuario ? user.tipo_usuario.charAt(0).toUpperCase() + user.tipo_usuario.slice(1) : 'Sin tipo'}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Estado
                                </label>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        user.estado === 'activo' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : user.estado === 'inactivo'
                                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                        {user.estado ? user.estado.charAt(0).toUpperCase() + user.estado.slice(1) : 'Sin estado'}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Institución
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.entidad?.nombre || 'No especificada'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tipo de Institución
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {user.entidad?.tipo || 'No especificado'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información del Sistema</CardTitle>
                        <CardDescription>
                            Fechas de creación y última modificación
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Fecha de Creación
                                </label>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {new Date(user.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Última Modificación
                                </label>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {new Date(user.updated_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 
 