import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BookMarked, Plus, Search, Eye, Edit, Trash2, Filter, Handshake, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import LoansCreateModal from './create-modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Préstamos',
        href: '/loans',
    },
];

interface Prestamo {
    id: number;
    fecha_prestamo: string;
    fecha_devolucion_esperada: string;
    fecha_devolucion_real?: string;
    estado: string;
    multa: number;
    deposito: number;
    renovaciones_realizadas: number;
    puede_renovar: boolean;
    observaciones?: string;
    libro: {
        id: number;
        titulo: string;
        autor: string;
        isbn: string;
    };
    usuario_biblioteca: {
        id: number;
        nombre: string;
        apellido: string;
        tipo_usuario: string;
        entidad?: {
            nombre: string;
            tipo: string;
        };
    };
}

interface Stats {
    total: number;
    prestados: number;
    devueltos: number;
    vencidos: number;
}

interface Props {
    prestamos: {
        data: Prestamo[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    stats: Stats;
    filters?: {
        estado?: string;
    };
    usuarios: any[];
    libros: any[];
}

const getEstadoColor = (estado: string) => {
    switch (estado) {
        case 'activo':
            return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
        case 'devuelto':
            return 'bg-green-600/20 text-green-300 border-green-500/30';
        case 'vencido':
            return 'bg-red-600/20 text-red-300 border-red-500/30';
        default:
            return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
};

const getEstadoLabel = (estado: string) => {
    switch (estado) {
        case 'activo':
            return 'Prestado';
        case 'devuelto':
            return 'Devuelto';
        case 'vencido':
            return 'Vencido';
        default:
            return estado;
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const isVencido = (fechaEsperada: string) => {
    return new Date(fechaEsperada) < new Date();
};

export default function LoansIndex({ prestamos, stats, filters = {}, usuarios, libros }: Props) {
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || 'todos');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtrado con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (estadoFilter !== filters.estado) {
                router.get('/loans', { estado: estadoFilter }, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [estadoFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Préstamos" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg">
                            <Handshake className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Gestión de Préstamos
                            </h1>
                            <p className="text-gray-400">
                                Administra los préstamos de libros del sistema
                            </p>
                        </div>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => setIsModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Préstamo
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total de Préstamos</p>
                                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                                </div>
                                <BookMarked className="h-8 w-8 text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Prestados</p>
                                    <p className="text-2xl font-bold text-blue-300">{stats.prestados}</p>
                                </div>
                                <BookMarked className="h-8 w-8 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Devueltos</p>
                                    <p className="text-2xl font-bold text-green-300">{stats.devueltos}</p>
                                </div>
                                <BookMarked className="h-8 w-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Vencidos</p>
                                    <p className="text-2xl font-bold text-red-300">{stats.vencidos}</p>
                                </div>
                                <AlertCircle className="h-8 w-8 text-red-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filtros
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Filtra los préstamos por estado
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Todos los estados" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="todos" className="text-white hover:bg-gray-700">Todos los estados</SelectItem>
                                    <SelectItem value="activo" className="text-white hover:bg-gray-700">Prestados</SelectItem>
                                    <SelectItem value="devuelto" className="text-white hover:bg-gray-700">Devueltos</SelectItem>
                                    <SelectItem value="vencido" className="text-white hover:bg-gray-700">Vencidos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Loans List */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Lista de Préstamos</CardTitle>
                        <CardDescription className="text-gray-400">
                            Mostrando {prestamos?.data?.length || 0} de {prestamos?.total || 0} préstamos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!prestamos?.data || prestamos.data.length === 0 ? (
                            <div className="text-center py-12">
                                <BookMarked className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                                <h3 className="text-lg font-medium text-gray-300 mb-2">No se encontraron préstamos</h3>
                                <p className="text-gray-400 text-sm">
                                    {estadoFilter ? 'Intenta con otros filtros.' : 'Comienza creando un préstamo.'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {prestamos.data.map((prestamo) => (
                                    <div
                                        key={prestamo.id}
                                        className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 transition-colors bg-black/20"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
                                                    <BookMarked className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h3 className="text-sm font-medium text-white truncate">
                                                        {prestamo.libro.titulo}
                                                    </h3>
                                                    <Badge className={getEstadoColor(prestamo.estado)}>
                                                        {getEstadoLabel(prestamo.estado)}
                                                    </Badge>
                                                    {isVencido(prestamo.fecha_devolucion_esperada) && prestamo.estado === 'activo' && (
                                                        <Badge className="bg-red-600/20 text-red-300 border-red-500/30">
                                                            Vencido
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400 truncate mb-1">
                                                    {prestamo.libro.autor} • {prestamo.usuario_biblioteca.nombre} {prestamo.usuario_biblioteca.apellido}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>Prestado: {formatDate(prestamo.fecha_prestamo)}</span>
                                                    <span>Devuelto: {formatDate(prestamo.fecha_devolucion_esperada)}</span>
                                                    {prestamo.multa > 0 && (
                                                        <span className="text-red-400">Multa: ${prestamo.multa.toLocaleString()}</span>
                                                    )}
                                                    {prestamo.deposito > 0 && (
                                                        <span className="text-yellow-400">Depósito: ${prestamo.deposito.toLocaleString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link href={`/loans/${prestamo.id}`}>
                                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/loans/${prestamo.id}/edit`}>
                                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {prestamos?.last_page && prestamos.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                                <div className="text-sm text-gray-400">
                                    Mostrando {((prestamos.current_page - 1) * prestamos.per_page) + 1} a{' '}
                                    {Math.min(prestamos.current_page * prestamos.per_page, prestamos.total)} de{' '}
                                    {prestamos.total} resultados
                                </div>
                                <div className="flex items-center space-x-2">
                                    {prestamos.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                                link.active
                                                    ? 'bg-orange-600 text-white'
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
                <LoansCreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} entidades={[]} usuarios={usuarios} libros={libros} />
            </div>
        </AppLayout>
    );
} 
 