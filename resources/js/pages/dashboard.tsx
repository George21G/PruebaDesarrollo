import { Head } from '@inertiajs/react';
import { 
    BookOpen, 
    Users, 
    BookMarked, 
    Clock, 
    TrendingUp, 
    AlertCircle,
    BarChart3,
    Activity,
    FileText,
    Building
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    total_libros: number;
    libros_disponibles: number;
    total_usuarios: number;
    prestamos_activos: number;
    prestamos_vencidos: number;
    total_entidades: number;
    entidades_por_tipo: {
        colegios: number;
        universidades: number;
        empresas: number;
        naturales: number;
    };
    libros_por_categoria: Array<{name: string, value: number}>;
    usuarios_por_tipo: Array<{name: string, value: number}>;
    entidades_por_tipo: Array<{name: string, value: number}>;
    prestamos_por_estado: Array<{name: string, value: number}>;
}

export default function Dashboard({ 
    total_libros, 
    libros_disponibles, 
    total_usuarios, 
    prestamos_activos, 
    prestamos_vencidos,
    total_entidades,
    entidades_por_tipo,
    libros_por_categoria,
    usuarios_por_tipo,
    entidades_por_tipo: entidadesChart,
    prestamos_por_estado
}: DashboardProps) {
    // Colores para las gráficas
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Gestión de Inventario" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Welcome Section */}
                <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                            <BookOpen className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">
                                Panel de Control
                            </h1>
                            <p className="text-gray-400">
                                Gestión de Inventario de Biblioteca #CDLM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Total de Libros
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{total_libros}</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {total_libros > 0 ? `${libros_disponibles} disponibles` : 'Sin libros registrados'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Libros Prestados
                            </CardTitle>
                            <BookMarked className="h-4 w-4 text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{prestamos_activos}</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {prestamos_activos > 0 ? `${prestamos_vencidos} vencidos` : 'Sin préstamos activos'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Usuarios Activos
                            </CardTitle>
                            <Users className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{total_usuarios}</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Activity className="h-3 w-3 mr-1" />
                                {total_usuarios > 0 ? 'Usuarios registrados' : 'Sin usuarios registrados'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Entidades
                            </CardTitle>
                            <Building className="h-4 w-4 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{total_entidades}</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Building className="h-3 w-3 mr-1" />
                                {total_entidades > 0 ? 
                                    `${entidades_por_tipo.colegios + entidades_por_tipo.universidades + entidades_por_tipo.empresas + entidades_por_tipo.naturales} activas` : 
                                    'Sin entidades registradas'
                                }
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Libros por Categoría */}
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Libros por Categoría
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Distribución de libros por categoría
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {libros_por_categoria.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={libros_por_categoria}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {libros_por_categoria.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#f9fafb'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-48">
                                    <p className="text-gray-400">No hay datos disponibles</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Usuarios por Tipo */}
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Usuarios por Tipo
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Distribución de usuarios por tipo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {usuarios_por_tipo.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={usuarios_por_tipo}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#9ca3af"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#9ca3af"
                                            fontSize={12}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#f9fafb'
                                            }}
                                        />
                                        <Bar dataKey="value" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-48">
                                    <p className="text-gray-400">No hay datos disponibles</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Entidades por Tipo */}
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                Entidades por Tipo
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Distribución de entidades por tipo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {entidadesChart.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={entidadesChart}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {entidadesChart.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#f9fafb'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-48">
                                    <p className="text-gray-400">No hay datos disponibles</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Préstamos por Estado */}
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <BookMarked className="h-5 w-5" />
                                Préstamos por Estado
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Distribución de préstamos por estado
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {prestamos_por_estado.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={prestamos_por_estado}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#9ca3af"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#9ca3af"
                                            fontSize={12}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1f2937', 
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#f9fafb'
                                            }}
                                        />
                                        <Bar dataKey="value" fill="#f59e0b" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-48">
                                    <p className="text-gray-400">No hay datos disponibles</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Conditions Section */}
                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Condiciones de Préstamo</CardTitle>
                            <CardDescription className="text-gray-400">
                                Políticas y reglas de préstamo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-blue-400" />
                                        <span className="text-gray-300">Duración del préstamo</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">15 días</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <BookMarked className="h-5 w-5 text-orange-400" />
                                        <span className="text-gray-300">Libros por usuario</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">3 máximo</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <AlertCircle className="h-5 w-5 text-red-400" />
                                        <span className="text-gray-300">Multa por retraso</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">$2.000/día</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <FileText className="h-5 w-5 text-green-400" />
                                        <span className="text-gray-300">Renovaciones</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">1 vez</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
