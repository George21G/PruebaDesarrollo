import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Users, Plus, Search, Eye, Edit, Trash2, Filter, UserCog, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/users',
    },
];

interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    tipo_usuario: string;
    telefono?: string;
    direccion?: string;
    user: {
        id: number;
        email: string;
    };
    entidad?: {
        id: number;
        nombre: string;
    };
}

interface Props {
    usuarios: {
        data: Usuario[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    entidades: Array<{
        id: number;
        nombre: string;
    }>;
    filters?: {
        q?: string;
    };
}

const getTipoUsuarioColor = (tipo: string) => {
    switch (tipo) {
        case 'colegio':
            return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
        case 'universidad':
            return 'bg-green-600/20 text-green-300 border-green-500/30';
        case 'empresa':
            return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
        default:
            return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
};

const getTipoUsuarioLabel = (tipo: string) => {
    switch (tipo) {
        case 'colegio':
            return 'Colegio';
        case 'universidad':
            return 'Universidad';
        case 'empresa':
            return 'Empresa';
        default:
            return tipo;
    }
};

export default function UsersIndex({ usuarios, entidades, filters = {} }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.q || '');
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        tipo_usuario: '',
        entidad_id: '',
        telefono: '',
        direccion: ''
    });

    // Usar los datos paginados directamente
    const displayedUsuarios = usuarios.data;

    const handlePageChange = (page: number) => {
        router.get(route('users.index'), { page, q: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.get(route('users.index'), { q: term }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openViewModal = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setIsViewModalOpen(true);
    };

    const openEditModal = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setEditForm({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.user.email,
            tipo_usuario: usuario.tipo_usuario,
            entidad_id: usuario.entidad?.id || '',
            telefono: usuario.telefono || '',
            direccion: usuario.direccion || ''
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUsuario) {
            console.log('Enviando actualización para usuario:', selectedUsuario.id);
            console.log('Datos del formulario:', editForm);
            console.log('URL de la ruta:', route('users.update', selectedUsuario.id));
            
            router.put(route('users.update', selectedUsuario.id), editForm, {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setSelectedUsuario(null);
                    router.reload();
                    alert('Usuario actualizado exitosamente');
                },
                onError: (errors) => {
                    console.error('Errores de validación:', errors);
                    if (errors.status === 419) {
                        alert('Error de autenticación. Por favor, recarga la página e intenta nuevamente.');
                    } else if (errors.status === 405) {
                        alert('Error de método no permitido. La sesión puede haber expirado. Por favor, vuelve a iniciar sesión.');
                    } else {
                        alert('Error al actualizar el usuario. Verifica los datos ingresados.');
                    }
                }
            });
        }
    };

    const handleDelete = (usuario: Usuario) => {
        if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${usuario.nombre} ${usuario.apellido}"?\n\nEsta acción no se puede deshacer y eliminará tanto el usuario de biblioteca como su cuenta de acceso.`)) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            router.delete(route('users.destroy', usuario.id), {
                headers: {
                    'X-CSRF-TOKEN': csrfToken || ''
                },
                onSuccess: () => {
                    // Recargar la página para mostrar los cambios
                    router.reload();
                    // Mostrar mensaje de éxito
                    alert('Usuario eliminado exitosamente');
                },
                onError: (errors) => {
                    console.error('Error al eliminar:', errors);
                    if (errors.status === 419) {
                        alert('Error de autenticación. Por favor, recarga la página e intenta nuevamente.');
                    } else if (errors.status === 405) {
                        alert('Error de método no permitido. La sesión puede haber expirado. Por favor, vuelve a iniciar sesión.');
                    } else {
                        alert('Error al eliminar el usuario. Inténtalo de nuevo.');
                    }
                }
            });
        }
    };

    const getStats = () => {
        const stats = {
            total: usuarios.total,
            colegio: usuarios.data.filter(u => u.tipo_usuario === 'colegio').length,
            universidad: usuarios.data.filter(u => u.tipo_usuario === 'universidad').length,
            empresa: usuarios.data.filter(u => u.tipo_usuario === 'empresa').length,
        };
        return stats;
    };

    const stats = getStats();

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, usuarios.current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(usuarios.last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Botón "Anterior"
        buttons.push(
            <Button
                key="prev"
                variant="outline"
                size="sm"
                disabled={usuarios.current_page === 1}
                onClick={() => handlePageChange(usuarios.current_page - 1)}
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
                    variant={i === usuarios.current_page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i)}
                    className={
                        i === usuarios.current_page
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                    }
                >
                    {i}
                </Button>
            );
        }

        // Última página
        if (endPage < usuarios.last_page) {
            if (endPage < usuarios.last_page - 1) {
                buttons.push(
                    <span key="dots2" className="text-gray-400 px-2">
                        ...
                    </span>
                );
            }
            buttons.push(
                <Button
                    key={usuarios.last_page}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(usuarios.last_page)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                    {usuarios.last_page}
                </Button>
            );
        }

        // Botón "Siguiente"
        buttons.push(
            <Button
                key="next"
                variant="outline"
                size="sm"
                disabled={usuarios.current_page === usuarios.last_page}
                onClick={() => handlePageChange(usuarios.current_page + 1)}
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
            <Head title="Gestión de Usuarios" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
                            <UserCog className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Gestión de Usuarios
                            </h1>
                            <p className="text-gray-400">
                                Administra los usuarios del sistema de biblioteca
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Link href={route('users.search')}>
                                <Search className="h-4 w-4 mr-2" />
                                Buscar
                            </Link>
                        </Button>
                        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Link href={route('users.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar Usuario
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
                                    <p className="text-gray-400 text-sm">Total de Usuarios</p>
                                    <p className="text-2xl font-bold text-white">{usuarios.total}</p>
                                </div>
                                <Users className="h-8 w-8 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Mostrados</p>
                                    <p className="text-2xl font-bold text-white">{displayedUsuarios.length}</p>
                                </div>
                                <Filter className="h-8 w-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Tipos</p>
                                    <p className="text-2xl font-bold text-white">
                                        {new Set(displayedUsuarios.map(u => u.tipo_usuario)).size}
                                    </p>
                                </div>
                                <UserCog className="h-8 w-8 text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Página</p>
                                    <p className="text-2xl font-bold text-white">{usuarios.current_page}</p>
                                </div>
                                <Users className="h-8 w-8 text-purple-400" />
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
                                placeholder="Buscar por nombre, apellido, email o tipo de usuario..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            />
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm('');
                                        router.get(route('users.index'), {}, {
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
                                Buscando "{searchTerm}" en {usuarios.total} usuarios totales
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Users List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Usuarios ({displayedUsuarios.length})
                            {searchTerm && ` - Resultados de búsqueda`}
                        </h2>
                    </div>

                    {displayedUsuarios.length === 0 ? (
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardContent className="flex items-center justify-center p-12">
                                <div className="text-center">
                                    <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando el primer usuario'}
                                    </p>
                                    {!searchTerm && (
                                        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                                            <Link href={route('users.create')}>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Agregar Primer Usuario
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedUsuarios.map((usuario) => (
                                <Card key={usuario.id} className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-white text-lg mb-2">
                                                    {usuario.nombre} {usuario.apellido}
                                                </CardTitle>
                                                <p className="text-gray-400 text-sm mb-2">
                                                    {usuario.user.email}
                                                </p>
                                                <Badge variant="secondary" className={getTipoUsuarioColor(usuario.tipo_usuario)}>
                                                    {getTipoUsuarioLabel(usuario.tipo_usuario)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openViewModal(usuario)}
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => openEditModal(usuario)}
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(usuario)}
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
                                                <span className="text-gray-400">ID:</span>
                                                <span className="text-white font-mono">{usuario.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Tipo:</span>
                                                <span className="text-white">{getTipoUsuarioLabel(usuario.tipo_usuario)}</span>
                                            </div>
                                            {usuario.telefono && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Teléfono:</span>
                                                    <span className="text-white">{usuario.telefono}</span>
                                                </div>
                                            )}
                                            {usuario.entidad && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Entidad:</span>
                                                    <span className="text-white">{usuario.entidad.nombre}</span>
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
                {usuarios.last_page > 1 && (
                    <div className="mt-8 flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            {renderPaginationButtons()}
                        </div>
                        <div className="text-sm text-gray-400">
                            Mostrando {((usuarios.current_page - 1) * usuarios.per_page) + 1} a {Math.min(usuarios.current_page * usuarios.per_page, usuarios.total)} de {usuarios.total} usuarios
                        </div>
                    </div>
                )}
            </div>

            {/* View Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-bold mb-2">
                            Detalles del Usuario
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Información completa del usuario seleccionado.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUsuario && (
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">ID:</span>
                                <span className="text-white font-mono">{selectedUsuario.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Nombre:</span>
                                <span className="text-white">{selectedUsuario.nombre}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Apellido:</span>
                                <span className="text-white">{selectedUsuario.apellido}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Email:</span>
                                <span className="text-white">{selectedUsuario.user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Tipo:</span>
                                <span className="text-white">{getTipoUsuarioLabel(selectedUsuario.tipo_usuario)}</span>
                            </div>
                            {selectedUsuario.telefono && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Teléfono:</span>
                                    <span className="text-white">{selectedUsuario.telefono}</span>
                                </div>
                            )}
                            {selectedUsuario.direccion && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Dirección:</span>
                                    <span className="text-white">{selectedUsuario.direccion}</span>
                                </div>
                            )}
                            {selectedUsuario.entidad && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Entidad:</span>
                                    <span className="text-white">{selectedUsuario.entidad.nombre}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewModalOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <X className="h-4 w-4 mr-2" />
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-bold mb-2">
                            Editar Usuario
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            Modifica los datos del usuario seleccionado.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-gray-400 text-right">Nombre</Label>
                                <Input
                                    id="nombre"
                                    value={editForm.nombre}
                                    onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="apellido" className="text-gray-400 text-right">Apellido</Label>
                                <Input
                                    id="apellido"
                                    value={editForm.apellido}
                                    onChange={(e) => setEditForm({ ...editForm, apellido: e.target.value })}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-gray-400 text-right">Email</Label>
                                <Input
                                    id="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tipo_usuario" className="text-gray-400 text-right">Tipo de Usuario</Label>
                                <Select onValueChange={(value) => setEditForm({ ...editForm, tipo_usuario: value })} value={editForm.tipo_usuario}>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="colegio">Colegio</SelectItem>
                                        <SelectItem value="universidad">Universidad</SelectItem>
                                        <SelectItem value="empresa">Empresa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="entidad_id" className="text-gray-400 text-right">Entidad</Label>
                                <Select
                                    onValueChange={(value) => setEditForm({ ...editForm, entidad_id: value })}
                                    value={editForm.entidad_id}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                >
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Seleccionar entidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {entidades.map(entidad => (
                                            <SelectItem key={entidad.id} value={entidad.id}>
                                                {entidad.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="telefono" className="text-gray-400 text-right">Teléfono</Label>
                                <Input
                                    id="telefono"
                                    value={editForm.telefono}
                                    onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="direccion" className="text-gray-400 text-right">Dirección</Label>
                                <Input
                                    id="direccion"
                                    value={editForm.direccion}
                                    onChange={(e) => setEditForm({ ...editForm, direccion: e.target.value })}
                                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                                <Save className="h-4 w-4 mr-2" />
                                Guardar Cambios
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                <X className="h-4 w-4 mr-2" />
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 