import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-4 py-6">
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-300">Configuración</h3>
                <p className="text-gray-400 mt-2">Esta sección está en desarrollo</p>
            </div>
        </div>
    );
}
