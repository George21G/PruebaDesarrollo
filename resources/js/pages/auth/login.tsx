import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
            <Head title="Iniciar Sesión" />
            
            {/* Background de la pagina */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-800 to-indigo-800 opacity-15 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-800 to-blue-900 opacity-15 blur-3xl"></div>
            </div>

            <div className="relative flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-white">
                            Gestion de inventario en biblioteca
                        </h1>
                        <p className="text-blue-100">
                            Porfavor ingresa tus credenciales para continuar #CDLM
                        </p>
                    </div>

                    {/* formulario del login */}
                    <div className="rounded-2xl bg-black/90 p-8 shadow-xl backdrop-blur-sm border border-gray-700">
                        <form className="space-y-6" onSubmit={submit}>
                            {/* campo correo electronico  */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-white">
                                    Correo electrónico
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Ingresa tu correo electrónico"
                                        className="pl-10 h-12 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* campo contraseña */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-white">
                                        Contraseña
                                    </Label>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Ingresa tu contraseña"
                                        className="pl-10 pr-10 h-12 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* boton iniciar sesion */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                ) : (
                                    <Lock className="h-5 w-5 mr-2" />
                                )}
                                {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Button>
                        </form>

                        {/* Status Message */}
                        {status && (
                            <div className="mt-4 rounded-lg bg-green-900/20 p-4 text-center text-sm font-medium text-green-400 border border-green-700">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
