import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Libros',
        href: '/books',
    },
    {
        title: 'Editar',
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
}

interface Props {
    libro: Libro;
}

export default function Edit({ libro }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: libro.titulo,
        autor: libro.autor,
        isbn: libro.isbn || '',
        categoria: libro.categoria,
        editorial: libro.editorial || '',
        cantidad_total: libro.cantidad_total,
        cantidad_disponible: libro.cantidad_disponible,
        estado: libro.estado,
        ubicacion: libro.ubicacion || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/books/${libro.id}`);
    };

    const categorias = [
        'Literatura',
        'Ciencia',
        'Historia',
        'Tecnología',
        'Filosofía',
        'Arte',
        'Matemáticas',
        'Medicina',
        'Derecho',
        'Economía',
        'Psicología',
        'Sociología',
        'Biología',
        'Física',
        'Química',
        'Ingeniería',
        'Educación',
        'Religión',
        'Deportes',
        'Cocina',
        'Viajes',
        'Otros'
    ];

    const estados = [
        { value: 'disponible', label: 'Disponible' },
        { value: 'prestado', label: 'Prestado' },
        { value: 'mantenimiento', label: 'Mantenimiento' },
        { value: 'perdido', label: 'Perdido' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${libro.titulo}`} />
            
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
                                Editar Libro
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Modificar información del libro
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Información Básica */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>Información Básica</span>
                                </CardTitle>
                                <CardDescription>
                                    Datos principales del libro
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="titulo">Título *</Label>
                                    <Input
                                        id="titulo"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        placeholder="Título del libro"
                                        className={errors.titulo ? 'border-red-500' : ''}
                                    />
                                    {errors.titulo && (
                                        <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="autor">Autor *</Label>
                                    <Input
                                        id="autor"
                                        value={data.autor}
                                        onChange={(e) => setData('autor', e.target.value)}
                                        placeholder="Nombre del autor"
                                        className={errors.autor ? 'border-red-500' : ''}
                                    />
                                    {errors.autor && (
                                        <p className="text-sm text-red-500 mt-1">{errors.autor}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="isbn">ISBN</Label>
                                    <Input
                                        id="isbn"
                                        value={data.isbn}
                                        onChange={(e) => setData('isbn', e.target.value)}
                                        placeholder="ISBN del libro"
                                        className={errors.isbn ? 'border-red-500' : ''}
                                    />
                                    {errors.isbn && (
                                        <p className="text-sm text-red-500 mt-1">{errors.isbn}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="categoria">Categoría *</Label>
                                    <Select value={data.categoria} onValueChange={(value) => setData('categoria', value)}>
                                        <SelectTrigger className={errors.categoria ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Seleccionar categoría" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categorias.map((categoria) => (
                                                <SelectItem key={categoria} value={categoria}>
                                                    {categoria}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.categoria && (
                                        <p className="text-sm text-red-500 mt-1">{errors.categoria}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="editorial">Editorial</Label>
                                    <Input
                                        id="editorial"
                                        value={data.editorial}
                                        onChange={(e) => setData('editorial', e.target.value)}
                                        placeholder="Nombre de la editorial"
                                        className={errors.editorial ? 'border-red-500' : ''}
                                    />
                                    {errors.editorial && (
                                        <p className="text-sm text-red-500 mt-1">{errors.editorial}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información de Inventario */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Información de Inventario</CardTitle>
                                <CardDescription>
                                    Datos de cantidad y ubicación
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="cantidad_total">Total de Ejemplares *</Label>
                                    <Input
                                        id="cantidad_total"
                                        type="number"
                                        min="1"
                                        value={data.cantidad_total}
                                        onChange={(e) => setData('cantidad_total', parseInt(e.target.value))}
                                        className={errors.cantidad_total ? 'border-red-500' : ''}
                                    />
                                    {errors.cantidad_total && (
                                        <p className="text-sm text-red-500 mt-1">{errors.cantidad_total}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="cantidad_disponible">Ejemplares Disponibles *</Label>
                                    <Input
                                        id="cantidad_disponible"
                                        type="number"
                                        min="0"
                                        max={data.cantidad_total}
                                        value={data.cantidad_disponible}
                                        onChange={(e) => setData('cantidad_disponible', parseInt(e.target.value))}
                                        className={errors.cantidad_disponible ? 'border-red-500' : ''}
                                    />
                                    {errors.cantidad_disponible && (
                                        <p className="text-sm text-red-500 mt-1">{errors.cantidad_disponible}</p>
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
                                    <Label htmlFor="ubicacion">Ubicación</Label>
                                    <Input
                                        id="ubicacion"
                                        value={data.ubicacion}
                                        onChange={(e) => setData('ubicacion', e.target.value)}
                                        placeholder="Ej: Estante A1, Sección 3"
                                        className={errors.ubicacion ? 'border-red-500' : ''}
                                    />
                                    {errors.ubicacion && (
                                        <p className="text-sm text-red-500 mt-1">{errors.ubicacion}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/books')}
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
 