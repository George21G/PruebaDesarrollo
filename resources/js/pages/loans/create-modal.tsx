import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';

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
    cantidad_total: number;
}
interface Props {
    open: boolean;
    onClose: () => void;
    entidades: Entidad[];
    usuarios: UsuarioBiblioteca[];
    libros: Libro[];
}

const LoansCreateModal: React.FC<Props> = ({ open, onClose, usuarios, libros }) => {
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<string>('');
    const [selectedLibroId, setSelectedLibroId] = useState<string>('');
    const [fechaDevolucion, setFechaDevolucion] = useState<string>('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioBiblioteca | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        usuario_biblioteca_id: '',
        libro_id: '',
        fecha_prestamo: new Date().toISOString().split('T')[0],
        fecha_devolucion_esperada: '',
        observaciones: '',
    });

    useEffect(() => {
        if (selectedUsuarioId) {
            const usuario = usuarios.find(u => u.id === Number(selectedUsuarioId));
            setUsuarioSeleccionado(usuario || null);
            setData('usuario_biblioteca_id', selectedUsuarioId);
        } else {
            setUsuarioSeleccionado(null);
            setData('usuario_biblioteca_id', '');
        }
    }, [selectedUsuarioId]);

    useEffect(() => {
        setData('libro_id', selectedLibroId);
    }, [selectedLibroId]);

    useEffect(() => {
        setData('fecha_devolucion_esperada', fechaDevolucion);
    }, [fechaDevolucion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/loans', {
            onSuccess: () => {
                reset();
                setSelectedUsuarioId('');
                setSelectedLibroId('');
                setFechaDevolucion('');
                onClose();
            },
        });
    };

    useEffect(() => {
        if (!open) {
            reset();
            setSelectedUsuarioId('');
            setSelectedLibroId('');
            setFechaDevolucion('');
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                        Nuevo Préstamo
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Completa la información para registrar el préstamo
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Usuario */}
                        <div className="space-y-2">
                            <Label htmlFor="usuario" className="text-gray-300">Usuario *</Label>
                            <Select value={selectedUsuarioId} onValueChange={setSelectedUsuarioId}>
                                <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${errors.usuario_biblioteca_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Selecciona un usuario" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    {usuarios.map((usuario) => (
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
                            <Select value={selectedLibroId} onValueChange={setSelectedLibroId}>
                                <SelectTrigger className={`bg-gray-800 border-gray-700 text-white ${errors.libro_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Selecciona un libro" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    {libros.filter(l => l.cantidad_total > 0).map((libro) => (
                                        <SelectItem key={libro.id} value={libro.id.toString()} className="text-white hover:bg-gray-700">
                                            {libro.titulo} - {libro.autor}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.libro_id && (
                                <p className="text-sm text-red-400">{errors.libro_id}</p>
                            )}
                        </div>
                        {/* Fecha de devolución esperada */}
                        <div className="space-y-2">
                            <Label htmlFor="fecha_devolucion_esperada" className="text-gray-300">Fecha de Devolución Esperada *</Label>
                            <Input
                                id="fecha_devolucion_esperada"
                                type="date"
                                value={fechaDevolucion}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => setFechaDevolucion(e.target.value)}
                                className={`bg-gray-800 border-gray-700 text-white ${errors.fecha_devolucion_esperada ? 'border-red-500' : ''}`}
                            />
                            {errors.fecha_devolucion_esperada && (
                                <p className="text-sm text-red-400">{errors.fecha_devolucion_esperada}</p>
                            )}
                        </div>
                        {/* Mensaje de depósito */}
                        {usuarioSeleccionado?.tipo_usuario === 'natural' && (
                            <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded text-yellow-300 text-sm">
                                A los usuarios de tipo natural se les solicitará un depósito de garantía por el préstamo.
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-800">
                        <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-orange-600 hover:bg-orange-700 text-white">
                            {processing ? 'Registrando...' : 'Registrar Préstamo'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoansCreateModal; 