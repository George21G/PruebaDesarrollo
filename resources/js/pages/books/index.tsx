import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BookOpen, Plus, Search, Eye, Edit, Trash2, Filter, ChevronLeft, ChevronRight, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Libros',
        href: '/books',
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
    libros: {
        data: Libro[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters?: {
        q?: string;
    };
}

export default function BooksIndex({ libros, filters = {} }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.q || '');
    const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);
    const [editForm, setEditForm] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        categoria: '',
        editorial: '',
        cantidad_total: 0,
        cantidad_disponible: 0,
        estado: '',
        ubicacion: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Búsqueda global con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== filters.q) {
                router.get(route('books.index'), { q: searchTerm }, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Usar todos los libros de la respuesta del servidor (ya filtrados)
    const displayedLibros = libros.data;

    const handlePageChange = (page: number) => {
        router.get(route('books.index'), { page, q: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openViewModal = (libro: Libro) => {
        setSelectedLibro(libro);
        setIsViewModalOpen(true);
    };

    const openEditModal = (libro: Libro) => {
        setSelectedLibro(libro);
        setEditForm({
            titulo: libro.titulo,
            autor: libro.autor,
            isbn: libro.isbn || '',
            categoria: libro.categoria,
            editorial: libro.editorial || '',
            cantidad_total: libro.cantidad_total,
            cantidad_disponible: libro.cantidad_disponible,
            estado: libro.estado,
            ubicacion: libro.ubicacion || ''
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedLibro) {
            router.put(route('books.update', selectedLibro.id), editForm, {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setSelectedLibro(null);
                    // Recargar la página para mostrar los cambios
                    router.reload();
                    // Mostrar mensaje de éxito
                    alert('Libro actualizado exitosamente');
                },
                onError: (errors) => {
                    console.error('Errores de validación:', errors);
                    alert('Error al actualizar el libro. Verifica los datos ingresados.');
                }
            });
        }
    };

    const handleDelete = (libro: Libro) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el libro "${libro.titulo}"?\n\nEsta acción no se puede deshacer.`)) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            router.delete(route('books.destroy', libro.id), {
                headers: {
                    'X-CSRF-TOKEN': csrfToken || ''
                },
                onSuccess: () => {
                    // Recargar la página para mostrar los cambios
                    router.reload();
                    // Mostrar mensaje de éxito
                    alert('Libro eliminado exitosamente');
                },
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    alert('Error al eliminar el libro. Inténtalo de nuevo.');
                }
            });
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, libros.current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(libros.last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Botón "Anterior"
        buttons.push(
            <Button
                key="prev"
                variant="outline"
                size="sm"
                disabled={libros.current_page === 1}
                onClick={() => handlePageChange(libros.current_page - 1)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
            </Button>
        );

        // Primera página
        if (startPage > 1) {
            buttons.push(
                <Button
                    key="1"
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                    1
                </Button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="dots1" className="text-gray-400 px-2">
                        ...
                    </span>
                );
            }
        }

        // Páginas visibles
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    variant={i === libros.current_page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i)}
                    className={
                        i === libros.current_page
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                >
                    {i}
                </Button>
            );
        }

        // Última página
        if (endPage < libros.last_page) {
            if (endPage < libros.last_page - 1) {
                buttons.push(
                    <span key="dots2" className="text-gray-400 px-2">
                        ...
                    </span>
                );
            }
            buttons.push(
                <Button
                    key={libros.last_page}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(libros.last_page)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                    {libros.last_page}
                </Button>
            );
        }

        // Botón "Siguiente"
        buttons.push(
            <Button
                key="next"
                variant="outline"
                size="sm"
                disabled={libros.current_page === libros.last_page}
                onClick={() => handlePageChange(libros.current_page + 1)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        );

        return buttons;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Libros" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                            <BookOpen className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Gestión de Libros
                            </h1>
                            <p className="text-gray-400">
                                Administra el catálogo completo de libros
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href={route('books.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Libro
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total de Libros</p>
                                    <p className="text-2xl font-bold text-white">{libros.total}</p>
                                </div>
                                <BookOpen className="h-8 w-8 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Mostrados</p>
                                    <p className="text-2xl font-bold text-white">{displayedLibros.length}</p>
                                </div>
                                <Filter className="h-8 w-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Categorías</p>
                                    <p className="text-2xl font-bold text-white">
                                        {new Set(displayedLibros.map(l => l.categoria)).size}
                                    </p>
                                </div>
                                <BookOpen className="h-8 w-8 text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Página</p>
                                    <p className="text-2xl font-bold text-white">{libros.current_page}</p>
                                </div>
                                <BookOpen className="h-8 w-8 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Bar */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                            <Search className="h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar por título, autor, ISBN, editorial o categoría..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            />
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm('');
                                        router.get(route('books.index'), {}, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    Limpiar
                                </Button>
                            )}
                        </div>
                        {searchTerm && (
                            <div className="mt-2 text-sm text-gray-400">
                                Buscando "{searchTerm}" en {libros.total} libros totales
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Books List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Libros ({displayedLibros.length})
                            {searchTerm && ` - Resultados de búsqueda`}
                        </h2>
                    </div>

                    {displayedLibros.length === 0 ? (
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardContent className="flex items-center justify-center p-12">
                                <div className="text-center">
                                    <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        {searchTerm ? 'No se encontraron libros' : 'No hay libros registrados'}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando el primer libro'}
                                    </p>
                                    {!searchTerm && (
                                        <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                                            <Link href={route('books.create')}>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Agregar Primer Libro
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedLibros.map((libro) => (
                                <Card key={libro.id} className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                                                    {libro.titulo}
                                                </CardTitle>
                                                <p className="text-gray-400 text-sm mb-2">
                                                    Por {libro.autor}
                                                </p>
                                                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                                                    {libro.categoria}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openViewModal(libro)}
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openEditModal(libro)}
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(libro)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">ISBN:</span>
                                                <span className="text-white font-mono">{libro.isbn || 'No especificado'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Editorial:</span>
                                                <span className="text-white">{libro.editorial || 'No especificada'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Estado:</span>
                                                <span className="text-white">{libro.estado}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Disponibles:</span>
                                                <span className="text-white">{libro.cantidad_disponible} / {libro.cantidad_total}</span>
                                            </div>
                                            {libro.ubicacion && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Ubicación:</span>
                                                    <span className="text-white">{libro.ubicacion}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {libros.last_page > 1 && (
                    <div className="mt-8 flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            {renderPaginationButtons()}
                        </div>
                        <div className="text-sm text-gray-400">
                            Mostrando {((libros.current_page - 1) * libros.per_page) + 1} a {Math.min(libros.current_page * libros.per_page, libros.total)} de {libros.total} libros
                        </div>
                    </div>
                )}

                {/* Modal Ver Libro */}
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-white">
                                Detalles del Libro
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Información completa del libro seleccionado
                            </DialogDescription>
                        </DialogHeader>
                        {selectedLibro && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-gray-400 text-sm">Título</Label>
                                            <p className="text-white font-semibold text-lg">{selectedLibro.titulo}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400 text-sm">Autor</Label>
                                            <p className="text-white">{selectedLibro.autor}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400 text-sm">ISBN</Label>
                                            <p className="text-white font-mono">{selectedLibro.isbn || 'No especificado'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400 text-sm">Categoría</Label>
                                            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                                                {selectedLibro.categoria}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-gray-400 text-sm">Editorial</Label>
                                            <p className="text-white">{selectedLibro.editorial || 'No especificada'}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400 text-sm">Estado</Label>
                                            <Badge 
                                                variant="secondary" 
                                                className={
                                                    selectedLibro.estado === 'disponible' ? 'bg-green-600/20 text-green-300 border-green-500/30' :
                                                    selectedLibro.estado === 'prestado' ? 'bg-orange-600/20 text-orange-300 border-orange-500/30' :
                                                    'bg-red-600/20 text-red-300 border-red-500/30'
                                                }
                                            >
                                                {selectedLibro.estado}
                                            </Badge>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400 text-sm">Cantidad</Label>
                                            <p className="text-white">{selectedLibro.cantidad_disponible} / {selectedLibro.cantidad_total} disponibles</p>
                                        </div>
                                        {selectedLibro.ubicacion && (
                                            <div>
                                                <Label className="text-gray-400 text-sm">Ubicación</Label>
                                                <p className="text-white">{selectedLibro.ubicacion}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="border-t border-gray-700 pt-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <Label className="text-gray-400">Fecha de creación</Label>
                                            <p className="text-white">{new Date(selectedLibro.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-400">Última actualización</Label>
                                            <p className="text-white">{new Date(selectedLibro.updated_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsViewModalOpen(false)}
                                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                                Cerrar
                            </Button>
                            {selectedLibro && (
                                <Button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        openEditModal(selectedLibro);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Modal Editar Libro */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-white">
                                Editar Libro
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Modifica la información del libro
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="titulo" className="text-gray-300">Título *</Label>
                                        <Input
                                            id="titulo"
                                            value={editForm.titulo}
                                            onChange={(e) => setEditForm({...editForm, titulo: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="autor" className="text-gray-300">Autor *</Label>
                                        <Input
                                            id="autor"
                                            value={editForm.autor}
                                            onChange={(e) => setEditForm({...editForm, autor: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="isbn" className="text-gray-300">ISBN</Label>
                                        <Input
                                            id="isbn"
                                            value={editForm.isbn}
                                            onChange={(e) => setEditForm({...editForm, isbn: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="categoria" className="text-gray-300">Categoría *</Label>
                                        <Select value={editForm.categoria} onValueChange={(value) => setEditForm({...editForm, categoria: value})}>
                                            <SelectTrigger id="categoria" className="bg-gray-800 border-gray-600 text-white">
                                                <SelectValue placeholder="Selecciona una categoría" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-600">
                                                <SelectItem value="ficción">Ficción</SelectItem>
                                                <SelectItem value="no ficción">No Ficción</SelectItem>
                                                <SelectItem value="ciencia">Ciencia</SelectItem>
                                                <SelectItem value="tecnología">Tecnología</SelectItem>
                                                <SelectItem value="historia">Historia</SelectItem>
                                                <SelectItem value="filosofía">Filosofía</SelectItem>
                                                <SelectItem value="arte">Arte</SelectItem>
                                                <SelectItem value="literatura">Literatura</SelectItem>
                                                <SelectItem value="educación">Educación</SelectItem>
                                                <SelectItem value="otros">Otros</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="editorial" className="text-gray-300">Editorial</Label>
                                        <Input
                                            id="editorial"
                                            value={editForm.editorial}
                                            onChange={(e) => setEditForm({...editForm, editorial: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cantidad_total" className="text-gray-300">Cantidad Total *</Label>
                                        <Input
                                            id="cantidad_total"
                                            type="number"
                                            min="1"
                                            value={editForm.cantidad_total}
                                            onChange={(e) => setEditForm({...editForm, cantidad_total: parseInt(e.target.value) || 0})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cantidad_disponible" className="text-gray-300">Cantidad Disponible *</Label>
                                        <Input
                                            id="cantidad_disponible"
                                            type="number"
                                            min="0"
                                            max={editForm.cantidad_total}
                                            value={editForm.cantidad_disponible}
                                            onChange={(e) => setEditForm({...editForm, cantidad_disponible: parseInt(e.target.value) || 0})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="estado" className="text-gray-300">Estado *</Label>
                                        <Select value={editForm.estado} onValueChange={(value) => setEditForm({...editForm, estado: value})}>
                                            <SelectTrigger id="estado" className="bg-gray-800 border-gray-600 text-white">
                                                <SelectValue placeholder="Selecciona un estado" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-600">
                                                <SelectItem value="disponible">Disponible</SelectItem>
                                                <SelectItem value="prestado">Prestado</SelectItem>
                                                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                                                <SelectItem value="perdido">Perdido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="ubicacion" className="text-gray-300">Ubicación</Label>
                                        <Input
                                            id="ubicacion"
                                            value={editForm.ubicacion}
                                            onChange={(e) => setEditForm({...editForm, ubicacion: e.target.value})}
                                            className="bg-gray-800 border-gray-600 text-white"
                                            placeholder="Ej: Estante A, Nivel 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Cambios
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
} 