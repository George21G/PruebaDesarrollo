import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Handshake, Plus, Building, Users, BookOpen, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

interface Entidad {
    id: number;
    nombre: string;
    tipo: string;
}

interface UsuarioBiblioteca {
    id: number;
    nombre: string;
    apellido: string;
    tipo_usuario: string;
    entidad: Entidad;
}

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    cantidad_ejemplares: number;
}

interface Props {
    entidades: Entidad[];
    usuarios: UsuarioBiblioteca[];
    libros: Libro[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Préstamos', href: '/loans' },
    { title: 'Crear Préstamo', href: '/loans/create' },
];

export default function LoansCreate({ entidades, usuarios, libros }: Props) {
    const [selectedEntidadId, setSelectedEntidadId] = useState<string>('todas');
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | ''>('');
    const [selectedLibroId, setSelectedLibroId] = useState<number | ''>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        usuario_biblioteca_id: '',
        libro_id: '',
        fecha_prestamo: new Date().toISOString().split('T')[0],
        observaciones: '',
    });

    // Filtrar usuarios por entidad seleccionada
    const usuariosFiltrados = usuarios.filter(usuario => 
        selectedEntidadId === 'todas' || usuario.entidad.id === Number(selectedEntidadId)
    );

    // Filtrar libros disponibles
    const librosDisponibles = libros.filter(libro => libro.cantidad_ejemplares > 0);

    // Obtener información del usuario seleccionado
    const usuarioSeleccionado = usuarios.find(u => u.id === selectedUsuarioId);

    // Calcular depósito
    const deposito = usuarioSeleccionado?.tipo_usuario === 'natural' ? 15000 : 0;

    // Obtener información de préstamos del usuario
    useEffect(() => {
        if (selectedUsuarioId) {
            fetch(`/loans/user-info/${selectedUsuarioId}`)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(error => console.error('Error:', error));
        } else {
            setUserInfo(null);
        }
    }, [selectedUsuarioId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/loans', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                setSelectedEntidadId('todas');
                setSelectedUsuarioId('');
                setSelectedLibroId('');
                setUserInfo(null);
            },
        });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        reset();
        setSelectedEntidadId('todas');
        setSelectedUsuarioId('');
        setSelectedLibroId('');
        setUserInfo(null);
    };

    const handleUsuarioChange = (usuarioId: string) => {
        setSelectedUsuarioId(Number(usuarioId));
        setData('usuario_biblioteca_id', usuarioId);
    };

    const handleLibroChange = (libroId: string) => {
        setSelectedLibroId(Number(libroId));
        setData('libro_id', libroId);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Préstamo" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/loans">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                                ← Volver
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg">
                                <Handshake className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">Crear Préstamo</h1>
                                <p className="text-gray-400">
                                    Registra un nuevo préstamo de libro
                                </p>
                            </div>
                        </div>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Crear Préstamo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-white flex items-center gap-2">
                                    <Handshake className="h-5 w-5" />
                                    Crear Nuevo Préstamo
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Completa la información para registrar el préstamo
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Entidad */}
                                    <div className="space-y-2">
                                        <Label htmlFor="entidad" className="text-gray-300">Entidad</Label>
                                        <Select value={selectedEntidadId} onValueChange={(value) => setSelectedEntidadId(value)}>
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                <SelectValue placeholder="Selecciona una entidad" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="todas" className="text-white hover:bg-gray-700">Todas las entidades</SelectItem>
                                                {entidades.map((entidad) => (
                                                    <SelectItem key={entidad.id} value={entidad.id.toString()} className="text-white hover:bg-gray-700">
                                                        {entidad.nombre} ({entidad.tipo})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Usuario */}
                                    <div className="space-y-2">
                                        <Label htmlFor="usuario" className="text-gray-300">Usuario *</Label>
                                        <Select value={selectedUsuarioId.toString()} onValueChange={handleUsuarioChange}>
                                            <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${errors.usuario_biblioteca_id ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Selecciona un usuario" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {usuariosFiltrados.map((usuario) => (
                                                    <SelectItem key={usuario.id} value={usuario.id.toString()} className="text-white hover:bg-gray-700">
                                                        {usuario.nombre} {usuario.apellido} ({usuario.tipo_usuario})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.usuario_biblioteca_id && (
                                            <p className="text-sm text-red-400">{errors.usuario_biblioteca_id}</p>
                                        )}
                                    </div>

                                    {/* Libro */}
                                    <div className="space-y-2">
                                        <Label htmlFor="libro" className="text-gray-300">Libro *</Label>
                                        <Select value={selectedLibroId.toString()} onValueChange={handleLibroChange}>
                                            <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${errors.libro_id ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Selecciona un libro" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {librosDisponibles.map((libro) => (
                                                    <SelectItem key={libro.id} value={libro.id.toString()} className="text-white hover:bg-gray-700">
                                                        {libro.titulo} - {libro.autor} (Disponibles: {libro.cantidad_ejemplares})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.libro_id && (
                                            <p className="text-sm text-red-400">{errors.libro_id}</p>
                                        )}
                                    </div>

                                    {/* Fecha de préstamo */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fecha_prestamo" className="text-gray-300">Fecha de Préstamo *</Label>
                                        <Input
                                            id="fecha_prestamo"
                                            type="date"
                                            value={data.fecha_prestamo}
                                            onChange={(e) => setData('fecha_prestamo', e.target.value)}
                                            className={`bg-gray-800 border-gray-700 text-white ${errors.fecha_prestamo ? 'border-red-500' : ''}`}
                                        />
                                        {errors.fecha_prestamo && (
                                            <p className="text-sm text-red-400">{errors.fecha_prestamo}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Información del usuario */}
                                {usuarioSeleccionado && (
                                    <Card className="bg-gray-800/50 border-gray-700">
                                        <CardHeader>
                                            <CardTitle className="text-white text-lg">Información del Usuario</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <Label className="text-gray-300 text-sm">Nombre</Label>
                                                    <p className="text-white">{usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-gray-300 text-sm">Tipo de Usuario</Label>
                                                    <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                                                        {usuarioSeleccionado.tipo_usuario}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <Label className="text-gray-300 text-sm">Entidad</Label>
                                                    <p className="text-white">{usuarioSeleccionado.entidad.nombre}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-gray-300 text-sm">Depósito Requerido</Label>
                                                    <p className={`font-semibold ${deposito > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                                                        {deposito > 0 ? `$${deposito.toLocaleString()}` : 'Sin depósito'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Información de préstamos del usuario */}
                                            {userInfo && (
                                                <div className="space-y-3">
                                                    <Label className="text-gray-300 text-sm">Estado de Préstamos</Label>
                                                    <div className="grid gap-3 md:grid-cols-3">
                                                        <div className="flex items-center space-x-2 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                                                            <BookOpen className="h-4 w-4 text-blue-400" />
                                                            <div>
                                                                <p className="text-white text-sm font-medium">Prestados</p>
                                                                <p className="text-blue-300 text-xs">{userInfo.prestados.length}/3</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                                            <div>
                                                                <p className="text-white text-sm font-medium">Devueltos</p>
                                                                <p className="text-green-300 text-xs">{userInfo.devueltos.length}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                                                            <AlertCircle className="h-4 w-4 text-red-400" />
                                                            <div>
                                                                <p className="text-white text-sm font-medium">Vencidos</p>
                                                                <p className="text-red-300 text-xs">{userInfo.vencidos.length}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Observaciones */}
                                <div className="space-y-2">
                                    <Label htmlFor="observaciones" className="text-gray-300">Observaciones</Label>
                                    <Textarea
                                        id="observaciones"
                                        value={data.observaciones}
                                        onChange={(e) => setData('observaciones', e.target.value)}
                                        placeholder="Observaciones adicionales del préstamo..."
                                        rows={3}
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                    />
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
                                    <Button type="submit" disabled={processing} className="bg-orange-600 hover:bg-orange-700 text-white">
                                        {processing ? 'Creando...' : 'Crear Préstamo'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Instructions */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Handshake className="h-5 w-5" />
                            Instrucciones para Crear Préstamo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-white font-medium">Pasos a seguir:</h4>
                                <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
                                    <li>Selecciona la entidad (opcional, para filtrar usuarios)</li>
                                    <li>Elige el usuario que solicita el préstamo</li>
                                    <li>Selecciona el libro a prestar</li>
                                    <li>Verifica la información del usuario</li>
                                    <li>Confirma el préstamo</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-medium">Reglas importantes:</h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                                    <li>Máximo 3 libros por usuario</li>
                                    <li>15 días de plazo por libro</li>
                                    <li>Depósito $15.000 solo para personas naturales</li>
                                    <li>Multa $2.000/día de retraso (personas naturales)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 