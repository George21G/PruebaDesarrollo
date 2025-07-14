import { Head } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, BookOpen, User, Building, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Libros',
        href: '/books',
    },
    {
        title: 'Detalle',
        href: '#',
    },
];

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn?: string;
    categoria: string;
    editorial?: string;
    cantidad_total: number;
    cantidad_disponible: number;
    estado: string;
    ubicacion?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    libro: Libro;
}

export default function Show({ libro }: Props) {
    // Validar que el libro existe
    if (!libro) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Libro no encontrado" />
                <div className="flex h-full flex-1 flex-col gap-6 p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Libro no encontrado
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            El libro que buscas no existe o ha sido eliminado.
                        </p>
                        <Button onClick={() => router.visit('/books')}>
                            Volver a Libros
                        </Button>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const handleEdit = () => {
        router.visit(`/books/${libro.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            router.delete(`/books/${libro.id}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken || ''
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${libro.titulo} - Detalle`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.visit('/books')}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Detalle del Libro
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Información completa del libro
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

                {/* Book Details */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Main Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5" />
                                <span>Información del Libro</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Título
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.titulo || 'Sin título'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Autor
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.autor || 'Sin autor'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    ISBN
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.isbn || 'No especificado'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Categoría
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.categoria || 'Sin categoría'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Editorial
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.editorial || 'No especificada'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Inventory Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building className="h-5 w-5" />
                                <span>Información de Inventario</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Total de Ejemplares
                                    </label>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {libro.cantidad_total || 0}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Disponibles
                                    </label>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {libro.cantidad_disponible || 0}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Estado
                                </label>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        libro.estado === 'disponible' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : libro.estado === 'prestado'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : libro.estado === 'mantenimiento'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                        {libro.estado ? libro.estado.charAt(0).toUpperCase() + libro.estado.slice(1) : 'Sin estado'}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Ubicación
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {libro.ubicacion || 'No especificada'}
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
                                    {new Date(libro.created_at).toLocaleDateString('es-ES', {
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
                                    {new Date(libro.updated_at).toLocaleDateString('es-ES', {
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