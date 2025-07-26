import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Settings,
  ChevronRight,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  items?: SubNavigationItem[];
}

interface SubNavigationItem {
  title: string;
  url: string;
}

const navigationItems: NavigationItem[] = [
  { title: 'Dashboard', url: '/admin', icon: BarChart3 },
  {
    title: 'Products',
    icon: Package,
    items: [
      { title: 'All Products', url: '/admin/products' },
      { title: 'Add Product', url: '/admin/products/new' },
      { title: 'Categories', url: '/admin/products/categories' },
      { title: 'Bulk Operations', url: '/admin/products/bulk' },
    ],
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    badge: '12',
    items: [
      { title: 'All Orders', url: '/admin/orders' },
      { title: 'Pending', url: '/admin/orders/pending' },
      { title: 'Processing', url: '/admin/orders/processing' },
      { title: 'Shipped', url: '/admin/orders/shipped' },
    ],
  },
  {
    title: 'Customers',
    icon: Users,
    items: [
      { title: 'All Customers', url: '/admin/customers' },
      { title: 'Loyalty Points', url: '/admin/customers/loyalty' },
      { title: 'Activity Log', url: '/admin/customers/activity' },
    ],
  },
  {
    title: 'Content',
    icon: FileText,
    items: [
      { title: 'Homepage Banners', url: '/admin/content/banners' },
      { title: 'Promotional Text', url: '/admin/content/promotions' },
      { title: 'FAQ Management', url: '/admin/content/faq' },
      { title: 'SEO Management', url: '/admin/content/seo' },
    ],
  },
  {
    title: 'Reviews',
    icon: MessageSquare,
    badge: '5',
    items: [
      { title: 'All Reviews', url: '/admin/reviews' },
      { title: 'Pending Approval', url: '/admin/reviews/pending' },
      { title: 'Q&A Management', url: '/admin/reviews/qa' },
    ],
  },
  {
    title: 'Analytics',
    icon: TrendingUp,
    items: [
      { title: 'Sales Reports', url: '/admin/analytics/sales' },
      { title: 'Product Analytics', url: '/admin/analytics/products' },
      { title: 'User Activity', url: '/admin/analytics/users' },
      { title: 'Revenue Analytics', url: '/admin/analytics/revenue' },
    ],
  },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar
      className="bg-adminPrimary text-adminPrimary-foreground border-r border-adminPrimary-border"
      style={{ backgroundColor: '#0c244b' }} // Fallback to force dark navy
    >
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-8 h-8 bg-adminPrimary-accent rounded-full flex items-center justify-center">
            <span className="text-adminPrimary-foreground font-bold text-sm">AL</span>
          </div>
          <div>
            <div className="text-sm font-medium text-adminPrimary-accent">Amreya Linens</div>
            <div className="text-xs text-adminPrimary-foreground">Admin Panel</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full text-adminPrimary-foreground hover:bg-adminPrimary-header-bg">
                          {item.icon && <item.icon className="w-4 h-4 text-adminPrimary-accent" />}
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-adminPrimary-badge text-white">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className="ml-auto h-4 w-4 text-adminPrimary-accent" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="text-adminPrimary-foreground hover:bg-adminPrimary-header-bg"
                              >
                                <Link to={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="text-adminPrimary-foreground hover:bg-adminPrimary-header-bg"
                    >
                      <Link to={item.url!}>
                        {item.icon && <item.icon className="w-4 h-4 text-adminPrimary-accent" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto bg-adminPrimary-badge text-white">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-adminPrimary border-t border-adminPrimary-border">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-adminPrimary-accent rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-adminPrimary-foreground">Admin User</div>
              <div className="text-xs text-adminPrimary-foreground">admin@amreyalinens.com</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail
        className="bg-adminPrimary"
        style={{ backgroundColor: '#0c244b' }} // Fallback for rail
      />
    </Sidebar>
  );
}