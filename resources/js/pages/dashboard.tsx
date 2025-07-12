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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
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
                            <div className="text-2xl font-bold text-white">0</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Sin datos disponibles
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
                            <div className="text-2xl font-bold text-white">0</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                Sin préstamos activos
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
                            <div className="text-2xl font-bold text-white">0</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Activity className="h-3 w-3 mr-1" />
                                Sin usuarios registrados
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Instituciones
                            </CardTitle>
                            <Building className="h-4 w-4 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">0</div>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Building className="h-3 w-3 mr-1" />
                                Sin instituciones registradas
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Actividad Reciente</CardTitle>
                            <CardDescription className="text-gray-400">
                                Últimas transacciones del sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-8">
                                <div className="text-center">
                                    <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 text-sm">Sin actividad reciente</p>
                                    <p className="text-gray-500 text-xs">Los eventos aparecerán aquí</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Condiciones de Préstamo</CardTitle>
                            <CardDescription className="text-gray-400">
                                Políticas y reglas de préstamo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
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
                                    <span className="text-sm font-medium text-white">$1/día</span>
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

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Categorías Populares</CardTitle>
                            <CardDescription className="text-gray-400">
                                Libros más solicitados por categoría
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Ficción</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">75%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Ciencia</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">60%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Historia</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">45%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Tecnología</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">30%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Filosofía</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">20%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Arte</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-700 rounded-full h-2">
                                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">15%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Resumen del Sistema</CardTitle>
                            <CardDescription className="text-gray-400">
                                Estado general del inventario
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <BookOpen className="h-5 w-5 text-blue-400" />
                                        <span className="text-gray-300">Libros en inventario</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">0</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <BookMarked className="h-5 w-5 text-orange-400" />
                                        <span className="text-gray-300">Préstamos activos</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">0</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <Users className="h-5 w-5 text-green-400" />
                                        <span className="text-gray-300">Usuarios registrados</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">0</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Institutions Section */}
                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Instituciones Registradas</CardTitle>
                            <CardDescription className="text-gray-400">
                                Lista de instituciones afiliadas al sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-8">
                                <div className="text-center">
                                    <Building className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 text-sm">Sin instituciones registradas</p>
                                    <p className="text-gray-500 text-xs">Las instituciones aparecerán aquí</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
