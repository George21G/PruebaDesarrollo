import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BookOpen, Plus, ArrowLeft } from 'lucide-react';
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
        title: 'Agregar Libro',
        href: '/books/create',
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

const estados = [
    'disponible',
    'prestado',
    'mantenimiento',
    'perdido'
];

export default function CreateBook() {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        autor: '',
        isbn: '',
        categoria: '',
        editorial: '',
        cantidad_total: '1',
        cantidad_disponible: '1',
        estado: 'disponible',
        ubicacion: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Libro" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                            <Plus className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Agregar Nuevo Libro
                            </h1>
                            <p className="text-gray-400">
                                Registra un nuevo libro en el catálogo
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Link href={route('books.index')}>
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
                                <BookOpen className="h-5 w-5 mr-2" />
                                Información del Libro
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Completa todos los campos requeridos para registrar el libro
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Título */}
                                    <div className="space-y-2">
                                        <Label htmlFor="titulo" className="text-gray-300">
                                            Título *
                                        </Label>
                                        <Input
                                            id="titulo"
                                            type="text"
                                            value={data.titulo}
                                            onChange={(e) => setData('titulo', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ingresa el título del libro"
                                        />
                                        {errors.titulo && (
                                            <p className="text-red-400 text-sm">{errors.titulo}</p>
                                        )}
                                    </div>

                                    {/* Autor */}
                                    <div className="space-y-2">
                                        <Label htmlFor="autor" className="text-gray-300">
                                            Autor *
                                        </Label>
                                        <Input
                                            id="autor"
                                            type="text"
                                            value={data.autor}
                                            onChange={(e) => setData('autor', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ingresa el nombre del autor"
                                        />
                                        {errors.autor && (
                                            <p className="text-red-400 text-sm">{errors.autor}</p>
                                        )}
                                    </div>

                                    {/* ISBN */}
                                    <div className="space-y-2">
                                        <Label htmlFor="isbn" className="text-gray-300">
                                            ISBN
                                        </Label>
                                        <Input
                                            id="isbn"
                                            type="text"
                                            value={data.isbn}
                                            onChange={(e) => setData('isbn', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ej: 978-0-7475-3269-9"
                                        />
                                        {errors.isbn && (
                                            <p className="text-red-400 text-sm">{errors.isbn}</p>
                                        )}
                                    </div>

                                    {/* Categoría */}
                                    <div className="space-y-2">
                                        <Label htmlFor="categoria" className="text-gray-300">
                                            Categoría *
                                        </Label>
                                        <Select value={data.categoria} onValueChange={(value) => setData('categoria', value)}>
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                <SelectValue placeholder="Selecciona una categoría" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {categorias.map((categoria) => (
                                                    <SelectItem key={categoria} value={categoria} className="text-white hover:bg-gray-700">
                                                        {categoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.categoria && (
                                            <p className="text-red-400 text-sm">{errors.categoria}</p>
                                        )}
                                    </div>

                                    {/* Editorial */}
                                    <div className="space-y-2">
                                        <Label htmlFor="editorial" className="text-gray-300">
                                            Editorial
                                        </Label>
                                        <Input
                                            id="editorial"
                                            type="text"
                                            value={data.editorial}
                                            onChange={(e) => setData('editorial', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ingresa el nombre de la editorial"
                                        />
                                        {errors.editorial && (
                                            <p className="text-red-400 text-sm">{errors.editorial}</p>
                                        )}
                                    </div>

                                    {/* Cantidad Total */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_total" className="text-gray-300">
                                            Cantidad Total *
                                        </Label>
                                        <Input
                                            id="cantidad_total"
                                            type="number"
                                            value={data.cantidad_total}
                                            onChange={(e) => setData('cantidad_total', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="1"
                                            min="1"
                                        />
                                        {errors.cantidad_total && (
                                            <p className="text-red-400 text-sm">{errors.cantidad_total}</p>
                                        )}
                                    </div>

                                    {/* Cantidad Disponible */}
                                    <div className="space-y-2">
                                        <Label htmlFor="cantidad_disponible" className="text-gray-300">
                                            Cantidad Disponible *
                                        </Label>
                                        <Input
                                            id="cantidad_disponible"
                                            type="number"
                                            value={data.cantidad_disponible}
                                            onChange={(e) => setData('cantidad_disponible', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="1"
                                            min="0"
                                        />
                                        {errors.cantidad_disponible && (
                                            <p className="text-red-400 text-sm">{errors.cantidad_disponible}</p>
                                        )}
                                    </div>

                                    {/* Estado */}
                                    <div className="space-y-2">
                                        <Label htmlFor="estado" className="text-gray-300">
                                            Estado *
                                        </Label>
                                        <Select value={data.estado} onValueChange={(value) => setData('estado', value)}>
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                <SelectValue placeholder="Selecciona el estado" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {estados.map((estado) => (
                                                    <SelectItem key={estado} value={estado} className="text-white hover:bg-gray-700">
                                                        {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.estado && (
                                            <p className="text-red-400 text-sm">{errors.estado}</p>
                                        )}
                                    </div>

                                    {/* Ubicación */}
                                    <div className="space-y-2">
                                        <Label htmlFor="ubicacion" className="text-gray-300">
                                            Ubicación
                                        </Label>
                                        <Input
                                            id="ubicacion"
                                            type="text"
                                            value={data.ubicacion}
                                            onChange={(e) => setData('ubicacion', e.target.value)}
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                            placeholder="Ej: Estante A, Nivel 2"
                                        />
                                        {errors.ubicacion && (
                                            <p className="text-red-400 text-sm">{errors.ubicacion}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        <Link href={route('books.index')}>
                                            Cancelar
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar Libro'}
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
 