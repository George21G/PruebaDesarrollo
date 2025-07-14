import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, ArrowLeft, Edit, Users, Mail, Phone, MapPin, User, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';
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

interface Props {
    institution: Institution;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Entidades', href: '/institutions' },
    { title: 'Detalles', href: '#' },
];

export default function InstitutionsShow({ institution }: Props) {
    const getTipoIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'escuela':
                return <Building className="h-4 w-4" />;
            case 'universidad':
                return <Building className="h-4 w-4" />;
            case 'biblioteca':
                return <Building className="h-4 w-4" />;
            default:
                return <Building className="h-4 w-4" />;
        }
    };

    const getTipoColor = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'escuela':
                return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
            case 'universidad':
                return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
            case 'biblioteca':
                return 'bg-green-600/20 text-green-300 border-green-500/30';
            default:
                return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
        }
    };

    const formatTipo = (tipo: string) => {
        return tipo.charAt(0).toUpperCase() + tipo.slice(1);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${institution.nombre} - Detalles`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/institutions">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                                <Building className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{institution.nombre}</h1>
                                <p className="text-gray-400">
                                    Detalles de la entidad
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href={`/institutions/${institution.id}/edit`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Información Principal */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Información Básica */}
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Información General
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{institution.nombre}</h3>
                                        <Badge className={`mt-2 ${getTipoColor(institution.tipo)}`}>
                                            {formatTipo(institution.tipo)}
                                        </Badge>
                                    </div>
                                </div>

                                {institution.descripcion && (
                                    <div>
                                        <h4 className="font-medium mb-2 text-gray-300">Descripción</h4>
                                        <p className="text-gray-400">{institution.descripcion}</p>
                                    </div>
                                )}

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-300">Dirección</p>
                                            <p className="text-sm text-gray-400">{institution.direccion}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-300">Teléfono</p>
                                            <p className="text-sm text-gray-400">{institution.telefono}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-300">Email</p>
                                            <p className="text-sm text-gray-400">{institution.email}</p>
                                        </div>
                                    </div>

                                    {institution.responsable && (
                                        <div className="flex items-center space-x-3">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-300">Responsable</p>
                                                <p className="text-sm text-gray-400">{institution.responsable}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Fechas */}
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Información de Registro
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-300">Fecha de Creación</p>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(institution.created_at)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-300">Última Actualización</p>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(institution.updated_at)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Acciones Rápidas */}
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={`/institutions/${institution.id}/edit`} className="w-full">
                                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar Entidad
                                    </Button>
                                </Link>
                                <Link href="/institutions" className="w-full">
                                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800">
                                        <Building className="mr-2 h-4 w-4" />
                                        Ver Todas las Entidades
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Información Adicional */}
                        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Información</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">ID de Entidad</span>
                                    <span className="text-sm font-medium text-white">#{institution.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Tipo</span>
                                    <Badge variant="outline" className={getTipoColor(institution.tipo)}>
                                        {formatTipo(institution.tipo)}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 