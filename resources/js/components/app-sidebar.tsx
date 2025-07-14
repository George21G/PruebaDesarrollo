import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Plus, Search, Users, Filter, BookMarked, Settings, Building } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const libraryNavItems: NavItem[] = [
    {
        title: 'Agregar Libro',
        href: '/books/create',
        icon: Plus,
    },
    {
        title: 'Buscar Libros',
        href: '/books',
        icon: Search,
    },
    {
        title: 'Gestionar Usuarios',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Préstamos',
        href: '/loans',
        icon: BookMarked,
    },
    {
        title: 'Entidades', // Cambiado de 'Instituciones' a 'Entidades'
        href: '/institutions',
        icon: Building,
    },
];

const footerNavItems: NavItem[] = [];
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={libraryNavItems} title="Gestión de Biblioteca" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
