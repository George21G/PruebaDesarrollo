import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Search, Users, Filter, Eye, Edit, Plus, UserCog } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/users',
    },
    {
        title: 'Buscar Usuarios',
        href: '/users/search',
    },
];

const tiposUsuario = [
    { value: 'colegio', label: 'Colegio' },
    { value: 'universidad', label: 'Universidad' },
    { value: 'empresa', label: 'Empresa' },
    { value: 'natural', label: 'Natural' },
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
    filters: {
        q: string;
        tipo_usuario: string;
    };
}

const getTipoUsuarioColor = (tipo: string) => {
    switch (tipo) {
        case 'estudiante':
            return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
        case 'profesor':
            return 'bg-green-600/20 text-green-300 border-green-500/30';
        case 'administrador':
            return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
        case 'personal':
            return 'bg-orange-600/20 text-orange-300 border-orange-500/30';
        default:
            return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
};

const getTipoUsuarioLabel = (tipo: string) => {
    switch (tipo) {
        case 'estudiante':
            return 'Estudiante';
        case 'profesor':
            return 'Profesor';
        case 'administrador':
            return 'Administrador';
        case 'personal':
            return 'Personal';
        default:
            return tipo;
    }
};

export default function SearchUsers({ usuarios, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        q: filters.q || '',
        tipo_usuario: filters.tipo_usuario || '',
    });

    const handleSearch = () => {
        get(route('users.search'), {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setData({
            q: '',
            tipo_usuario: '',
        });
        get(route('users.search'), {
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buscar Usuarios" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                            <Search className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Buscar Usuarios
                            </h1>
                            <p className="text-gray-400">
                                Consulta y busca usuarios del sistema
                            </p>
                        </div>
                    </div>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href={route('users.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Usuario
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
                            Busca usuarios por nombre, apellido, email o tipo
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
                                    placeholder="Nombre, apellido, email..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>

                            {/* User Type Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="tipo_usuario" className="text-gray-300">
                                    Tipo de Usuario
                                </Label>
                                <Select value={data.tipo_usuario} onValueChange={(value) => setData('tipo_usuario', value)}>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Todos los tipos" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {tiposUsuario.map((tipo) => (
                                            <SelectItem key={tipo.value} value={tipo.value} className="text-white hover:bg-gray-700">
                                                {tipo.label}
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
                            Resultados ({usuarios.total})
                        </h2>
                        {usuarios.total > 0 && (
                            <p className="text-gray-400 text-sm">
                                Mostrando {usuarios.data.length} de {usuarios.total} usuarios
                            </p>
                        )}
                    </div>

                    {usuarios.total === 0 ? (
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardContent className="flex items-center justify-center p-12">
                                <div className="text-center">
                                    <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        No se encontraron usuarios
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Intenta con otros términos de búsqueda o filtros
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {usuarios.data.map((usuario) => (
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
                                                    asChild
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Link href={route('users.show', usuario.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    asChild
                                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                                >
                                                    <Link href={route('users.edit', usuario.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
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
                    <div className="flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            disabled={usuarios.current_page === 1}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                            Anterior
                        </Button>
                        <span className="text-gray-400">
                            Página {usuarios.current_page} de {usuarios.last_page}
                        </span>
                        <Button
                            variant="outline"
                            disabled={usuarios.current_page === usuarios.last_page}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                            Siguiente
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 
 