import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Search, BookOpen, Filter, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Libros',
        href: '/books',
    },
    {
        title: 'Buscar Libros',
        href: '/books/search',
    },
];

const categorias = [
    'Ficción',
    'No Ficción',
    'Ciencia',
    'Historia',
    'Tecnología',
    'Filosofía',
    'Arte',
    'Literatura',
    'Biografía',
    'Autoayuda',
    'Infantil',
    'Juvenil',
    'Académico',
    'Referencia',
    'Otros'
];

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    editorial: string;
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
        from: number;
        to: number;
    };
    filters: {
        q: string;
        categoria: string;
    };
}

export default function SearchBooks({ libros, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        q: filters.q || '',
        categoria: filters.categoria || 'todas',
    });

    const handleSearch = () => {
        get(route('books.search'), {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setData({
            q: '',
            categoria: 'todas',
        });
        get(route('books.search'), {
            preserveState: true,
        });
    };

    const handlePageChange = (page: number) => {
        get(route('books.search'), {
            q: data.q,
            categoria: data.categoria,
            page: page,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buscar Libros" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                            <Search className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Buscar Libros
                            </h1>
                            <p className="text-gray-400">
                                Consulta y busca en el catálogo de libros
                            </p>
                        </div>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href={route('books.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Libro
                        </Link>
                    </Button>
                </div>

                {/* Search Filters */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filtros de Búsqueda
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Busca libros por título, autor, ISBN o editorial
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Query */}
                            <div className="space-y-2">
                                <Label htmlFor="q" className="text-gray-300">
                                    Buscar
                                </Label>
                                <Input
                                    id="q"
                                    type="text"
                                    value={data.q}
                                    onChange={(e) => setData('q', e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                    placeholder="Título, autor, ISBN..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="categoria" className="text-gray-300">
                                    Categoría
                                </Label>
                                <Select value={data.categoria} onValueChange={(value) => setData('categoria', value)}>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Todas las categorías" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        <SelectItem value="todas" className="text-white hover:bg-gray-700">
                                            Todas las categorías
                                        </SelectItem>
                                        {categorias.map((categoria) => (
                                            <SelectItem key={categoria} value={categoria} className="text-white hover:bg-gray-700">
                                                {categoria}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-end space-x-2">
                                <Button
                                    onClick={handleSearch}
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    {processing ? 'Buscando...' : 'Buscar'}
                                </Button>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                >
                                    Limpiar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Resultados ({libros.total})
                        </h2>
                        {libros.total > 0 && (
                            <p className="text-gray-400 text-sm">
                                Mostrando {libros.from || 0} a {libros.to || libros.data.length} de {libros.total} libros
                            </p>
                        )}
                    </div>

                    {libros.total === 0 ? (
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardContent className="flex items-center justify-center p-12">
                                <div className="text-center">
                                    <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        No se encontraron libros
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Intenta con otros términos de búsqueda o filtros
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {libros.data.map((libro) => (
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
                                                    asChild
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Link href={route('books.show', libro.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    asChild
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Link href={route('books.edit', libro.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">ISBN:</span>
                                                <span className="text-white font-mono">{libro.isbn || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Editorial:</span>
                                                <span className="text-white">{libro.editorial || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Estado:</span>
                                                <span className="text-white capitalize">{libro.estado}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Total:</span>
                                                <span className="text-white">{libro.cantidad_total}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Disponibles:</span>
                                                <span className="text-white">{libro.cantidad_disponible}</span>
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
                    <div className="flex items-center justify-center space-x-4">
                        <Button
                            variant="outline"
                            disabled={libros.current_page === 1}
                            onClick={() => handlePageChange(libros.current_page - 1)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Anterior
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: Math.min(5, libros.last_page) }, (_, i) => {
                                let pageNum;
                                if (libros.last_page <= 5) {
                                    pageNum = i + 1;
                                } else if (libros.current_page <= 3) {
                                    pageNum = i + 1;
                                } else if (libros.current_page >= libros.last_page - 2) {
                                    pageNum = libros.last_page - 4 + i;
                                } else {
                                    pageNum = libros.current_page - 2 + i;
                                }
                                
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={libros.current_page === pageNum ? "default" : "outline"}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={
                                            libros.current_page === pageNum
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "border-gray-600 text-gray-300 hover:bg-gray-800"
                                        }
                                        size="sm"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>
                        
                        <Button
                            variant="outline"
                            disabled={libros.current_page === libros.last_page}
                            onClick={() => handlePageChange(libros.current_page + 1)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 
 