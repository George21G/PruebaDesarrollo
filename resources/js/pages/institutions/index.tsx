import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, Plus, Search, Filter, Users, BookOpen, GraduationCap, Library, X, Trash2 } from 'lucide-react';
import { Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

interface Stats {
    total: number;
    colegios: number;
    universidades: number;
    empresas: number;
    naturales: number;
}

interface Props {
    institutions: {
        data: Institution[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    stats: Stats;
    filters?: {
        q?: string;
    };
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Entidades', href: '/institutions' },
];

export default function InstitutionsIndex({ institutions, stats, filters = {} }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.q || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        tipo: '',
        direccion: '',
        telefono: '',
        email: '',
        responsable: '',
        descripcion: '',
    });

    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        nombre: '',
        tipo: '',
        direccion: '',
        telefono: '',
        email: '',
        responsable: '',
        descripcion: '',
    });

    const { delete: deleteInstitution, processing: deleteProcessing } = useForm();

    // Búsqueda global con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== filters.q) {
                router.get('/institutions', { q: searchTerm }, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/institutions', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleViewInstitution = (institution: Institution) => {
        setSelectedInstitution(institution);
        setIsViewModalOpen(true);
    };

    const handleEditInstitution = (institution: Institution) => {
        setSelectedInstitution(institution);
        setEditData({
            nombre: institution.nombre,
            tipo: institution.tipo,
            direccion: institution.direccion,
            telefono: institution.telefono,
            email: institution.email,
            responsable: institution.responsable || '',
            descripcion: institution.descripcion || '',
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedInstitution) {
            put(`/institutions/${selectedInstitution.id}`, {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    resetEdit();
                    setSelectedInstitution(null);
                },
            });
        }
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        resetEdit();
        setSelectedInstitution(null);
    };

    const handleViewModalClose = () => {
        setIsViewModalOpen(false);
        setSelectedInstitution(null);
    };

    const handleDeleteInstitution = (institution: Institution) => {
        setSelectedInstitution(institution);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedInstitution) {
            deleteInstitution(`/institutions/${selectedInstitution.id}`, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setSelectedInstitution(null);
                },
            });
        }
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setSelectedInstitution(null);
    };

    const getTipoIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'colegio':
                return <GraduationCap className="h-4 w-4" />;
            case 'universidad':
                return <BookOpen className="h-4 w-4" />;
            case 'empresa':
                return <Building className="h-4 w-4" />;
            case 'natural':
                return <Users className="h-4 w-4" />;
            default:
                return <Building className="h-4 w-4" />;
        }
    };

    const getTipoColor = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'colegio':
                return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
            case 'universidad':
                return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
            case 'empresa':
                return 'bg-green-600/20 text-green-300 border-green-500/30';
            case 'natural':
                return 'bg-orange-600/20 text-orange-300 border-orange-500/30';
            default:
                return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
        }
    };

    const formatTipo = (tipo: string) => {
        return tipo.charAt(0).toUpperCase() + tipo.slice(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Entidades" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                            <Building className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Entidades
                            </h1>
                            <p className="text-gray-400">
                                Gestiona las entidades educativas y bibliotecas del sistema
                            </p>
                        </div>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar Entidad
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-white flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Crear Nueva Entidad
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Completa todos los campos requeridos para registrar la nueva entidad
                                </DialogDescription>
                            </DialogHeader>
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
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={handleModalClose}
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white">
                                        {processing ? 'Creando...' : 'Crear Entidad'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">Total</CardTitle>
                            <Building className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">Colegios</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-300">{stats?.colegios || 0}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">Universidades</CardTitle>
                            <BookOpen className="h-4 w-4 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-300">{stats?.universidades || 0}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">Empresas</CardTitle>
                            <Building className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-300">{stats?.empresas || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Global Search */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Buscador Global de Entidades
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Busca entidades por nombre, dirección, teléfono, email o tipo
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar entidades por nombre, dirección, teléfono, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Institutions List */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Lista de Entidades</CardTitle>
                        <CardDescription className="text-gray-400">
                            Mostrando {institutions?.data?.length || 0} de {institutions?.total || 0} entidades
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!institutions?.data || institutions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Building className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                                <h3 className="text-lg font-medium text-gray-300 mb-2">No se encontraron entidades</h3>
                                <p className="text-gray-400 text-sm">
                                    {searchTerm ? 'Intenta con otros términos de búsqueda.' : 'Comienza agregando una entidad.'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {institutions.data.map((institution) => (
                                    <div
                                        key={institution.id}
                                        className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 transition-colors bg-black/20"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                                    {getTipoIcon(institution.tipo)}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h3 className="text-sm font-medium text-white truncate">
                                                        {institution.nombre}
                                                    </h3>
                                                    <Badge className={getTipoColor(institution.tipo)}>
                                                        {formatTipo(institution.tipo)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-400 truncate mb-1">
                                                    {institution.direccion}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>{institution.telefono}</span>
                                                    <span>{institution.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleViewInstitution(institution)}
                                                className="text-gray-400 hover:text-white hover:bg-gray-800"
                                            >
                                                Ver
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleEditInstitution(institution)}
                                                className="text-gray-400 hover:text-white hover:bg-gray-800"
                                            >
                                                Editar
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => handleDeleteInstitution(institution)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {institutions?.last_page && institutions.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                                <div className="text-sm text-gray-400">
                                    Mostrando {((institutions.current_page - 1) * institutions.per_page) + 1} a{' '}
                                    {Math.min(institutions.current_page * institutions.per_page, institutions.total)} de{' '}
                                    {institutions.total} resultados
                                </div>
                                <div className="flex items-center space-x-2">
                                    {institutions.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

                {/* View Modal */}
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                    <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-white flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                Detalles de la Entidad
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Información completa de la entidad seleccionada
                            </DialogDescription>
                        </DialogHeader>
                        {selectedInstitution && (
                            <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 font-medium">Nombre de la Entidad</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                                            {selectedInstitution.nombre}
                                        </div>
                                    </div>

                                    {/* Tipo */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 font-medium">Tipo de Entidad</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                                            <Badge className={getTipoColor(selectedInstitution.tipo)}>
                                                {formatTipo(selectedInstitution.tipo)}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-gray-300 font-medium">Dirección</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                                            {selectedInstitution.direccion}
                                        </div>
                                    </div>

                                    {/* Teléfono */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 font-medium">Teléfono</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                                            {selectedInstitution.telefono}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 font-medium">Email</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                                            {selectedInstitution.email}
                                        </div>
                                    </div>

                                    {/* Responsable */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 font-medium">Responsable</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white">
                                            {selectedInstitution.responsable || 'No especificado'}
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-gray-300 font-medium">Descripción</Label>
                                        <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-white min-h-[80px]">
                                            {selectedInstitution.descripcion || 'Sin descripción'}
                                        </div>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <div className="flex items-center justify-end pt-6 border-t border-gray-800">
                                    <Button 
                                        onClick={handleViewModalClose}
                                        className="bg-gray-600 hover:bg-gray-700 text-white"
                                    >
                                        Cerrar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-white flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                Editar Entidad
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Modifica la información de la entidad seleccionada
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-nombre" className="text-gray-300">Nombre de la Entidad *</Label>
                                    <Input
                                        id="edit-nombre"
                                        value={editData.nombre}
                                        onChange={(e) => setEditData('nombre', e.target.value)}
                                        placeholder="Ej: Universidad Nacional"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.nombre ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.nombre && (
                                        <p className="text-sm text-red-400">{editErrors.nombre}</p>
                                    )}
                                </div>

                                {/* Tipo */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-tipo" className="text-gray-300">Tipo de Entidad *</Label>
                                    <Select value={editData.tipo} onValueChange={(value) => setEditData('tipo', value)}>
                                        <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${editErrors.tipo ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                            <SelectItem value="colegio" className="text-white hover:bg-gray-700">Colegio</SelectItem>
                                            <SelectItem value="universidad" className="text-white hover:bg-gray-700">Universidad</SelectItem>
                                            <SelectItem value="empresa" className="text-white hover:bg-gray-700">Empresa</SelectItem>
                                            <SelectItem value="natural" className="text-white hover:bg-gray-700">Natural</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {editErrors.tipo && (
                                        <p className="text-sm text-red-400">{editErrors.tipo}</p>
                                    )}
                                </div>

                                {/* Dirección */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="edit-direccion" className="text-gray-300">Dirección *</Label>
                                    <Input
                                        id="edit-direccion"
                                        value={editData.direccion}
                                        onChange={(e) => setEditData('direccion', e.target.value)}
                                        placeholder="Ej: Calle Principal 123, Ciudad"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.direccion ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.direccion && (
                                        <p className="text-sm text-red-400">{editErrors.direccion}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-telefono" className="text-gray-300">Teléfono *</Label>
                                    <Input
                                        id="edit-telefono"
                                        value={editData.telefono}
                                        onChange={(e) => setEditData('telefono', e.target.value)}
                                        placeholder="Ej: +1234567890"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.telefono ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.telefono && (
                                        <p className="text-sm text-red-400">{editErrors.telefono}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-email" className="text-gray-300">Email *</Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData('email', e.target.value)}
                                        placeholder="Ej: contacto@entidad.edu"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.email ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.email && (
                                        <p className="text-sm text-red-400">{editErrors.email}</p>
                                    )}
                                </div>

                                {/* Responsable */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-responsable" className="text-gray-300">Responsable</Label>
                                    <Input
                                        id="edit-responsable"
                                        value={editData.responsable}
                                        onChange={(e) => setEditData('responsable', e.target.value)}
                                        placeholder="Ej: Dr. Juan Pérez"
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.responsable ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.responsable && (
                                        <p className="text-sm text-red-400">{editErrors.responsable}</p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="edit-descripcion" className="text-gray-300">Descripción</Label>
                                    <Textarea
                                        id="edit-descripcion"
                                        value={editData.descripcion}
                                        onChange={(e) => setEditData('descripcion', e.target.value)}
                                        placeholder="Descripción adicional de la entidad..."
                                        rows={4}
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 ${editErrors.descripcion ? 'border-red-500' : ''}`}
                                    />
                                    {editErrors.descripcion && (
                                        <p className="text-sm text-red-400">{editErrors.descripcion}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-800">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={handleEditModalClose}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={editProcessing} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    {editProcessing ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Modal */}
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent className="bg-gray-900 border-gray-800 max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-white flex items-center gap-2">
                                <Trash2 className="h-5 w-5 text-red-400" />
                                Confirmar Eliminación
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                                ¿Estás seguro de que quieres eliminar esta entidad?
                            </DialogDescription>
                        </DialogHeader>
                        {selectedInstitution && (
                            <div className="space-y-4">
                                <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                                            {getTipoIcon(selectedInstitution.tipo)}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">{selectedInstitution.nombre}</h3>
                                            <p className="text-gray-400 text-sm">{selectedInstitution.tipo}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-gray-300">
                                    <p className="mb-2">Esta acción no se puede deshacer. Se eliminará permanentemente:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                                        <li>La entidad y toda su información</li>
                                        <li>Los usuarios asociados a esta entidad</li>
                                        <li>Los libros registrados bajo esta entidad</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-800">
                                    <Button 
                                        onClick={handleDeleteModalClose}
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button 
                                        onClick={handleConfirmDelete}
                                        disabled={deleteProcessing}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        {deleteProcessing ? 'Eliminando...' : 'Eliminar Entidad'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
        </AppLayout>
    );
} 