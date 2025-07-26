import { Outlet, Link } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children?: React.ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
}

export default function AdminLayout({ children, breadcrumbs = [] }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-deep-navy-700 text-cream-white-200">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-deep-navy-600 px-4 bg-deep-navy-800">
          <SidebarTrigger className="-ml-1 text-gold-accent-400" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-deep-navy-600" />

          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/admin" className="text-gold-accent-400 hover:text-gold-accent-300">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={index} className="flex items-center">
                    <BreadcrumbSeparator className="text-gold-accent-500" />
                    <BreadcrumbItem>
                      {breadcrumb.to ? (
                        <BreadcrumbLink asChild>
                          <Link to={breadcrumb.to} className="text-gold-accent-400 hover:text-gold-accent-300">
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-gold-accent-400">{breadcrumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gold-accent-500" />
              <Input
                placeholder="Search..."
                className="w-64 pl-8 bg-deep-navy-900 text-soft-gray-300 border-deep-navy-600 placeholder-gold-accent-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-gold-accent-400 hover:text-gold-accent-300">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-egyptian-blue-600 text-white p-0 text-xs">
                3
              </Badge>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-deep-navy-700 text-cream-white-200">
          {children || <Outlet />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}