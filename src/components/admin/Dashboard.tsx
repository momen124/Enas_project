import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  Eye,
  Plus,
  Download,
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 198 },
  { month: 'Mar', sales: 5000, orders: 310 },
  { month: 'Apr', sales: 4500, orders: 280 },
  { month: 'May', sales: 6000, orders: 380 },
  { month: 'Jun', sales: 5500, orders: 340 },
];

const topProducts = [
  { name: 'Egyptian Cotton Sheet Set', sales: 150, revenue: 97500 },
  { name: 'Honeycomb Coverlet', sales: 89, revenue: 120150 },
  { name: 'Printed Bedsheet Set', sales: 67, revenue: 43550 },
  { name: 'Luxury Towel Set', sales: 45, revenue: 22500 },
];

const lowStockItems = [
  { name: 'Plain Flat Bedsheet (Double)', stock: 3, threshold: 10 },
  { name: 'Printed Sheet Set (Single)', stock: 5, threshold: 15 },
  { name: 'Cotton Coverlet (Yellow)', stock: 2, threshold: 8 },
];

const recentOrders = [
  { id: '#12345', customer: 'Ahmed Mohamed', amount: 750, status: 'pending' },
  { id: '#12346', customer: 'Sara Ali', amount: 1200, status: 'processing' },
  { id: '#12347', customer: 'Omar Hassan', amount: 650, status: 'shipped' },
  { id: '#12348', customer: 'Fatma Nour', amount: 950, status: 'delivered' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 bg-gray-900 text-gray-200">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45,231 EGP</div>
            <p className="text-xs text-gray-400">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">New Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12</div>
            <p className="text-xs text-gray-400">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +19% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">New Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <p className="text-xs text-gray-400">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +201 since last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">3</div>
            <p className="text-xs text-gray-400">Items below threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-gray-800 border-gray-700 col-span-4">
          <CardHeader>
            <CardTitle className="text-gray-200">Sales Overview</CardTitle>
            <CardDescription className="text-gray-400">Monthly sales and order trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: { label: 'Sales (EGP)', color: 'hsl(var(--chart-1))' },
                orders: { label: 'Orders', color: 'hsl(var(--chart-2))' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 col-span-3">
          <CardHeader>
            <CardTitle className="text-gray-200">Recent Orders</CardTitle>
            <CardDescription className="text-gray-400">Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between text-gray-200">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-400">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{order.amount} EGP</div>
                  <Badge
                    variant={
                      order.status === 'delivered'
                        ? 'default'
                        : order.status === 'shipped'
                        ? 'secondary'
                        : order.status === 'processing'
                        ? 'outline'
                        : 'destructive'
                    }
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-gray-700 text-gray-200 hover:bg-gray-600">
              <Eye className="mr-2 h-4 w-4" />
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Top Selling Products</CardTitle>
            <CardDescription className="text-gray-400">Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between text-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#4A2C2A] text-white rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-400">{product.sales} sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.revenue.toLocaleString()} EGP</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-200">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription className="text-gray-400">Items that need restocking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.name} className="space-y-2 text-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-400">
                    {item.stock}/{item.threshold}
                  </span>
                </div>
                <Progress value={(item.stock / item.threshold) * 100} className="h-2 bg-gray-700" />
              </div>
            ))}
            <Button variant="outline" className="w-full bg-gray-700 text-gray-200 hover:bg-gray-600">
              <Package className="mr-2 h-4 w-4" />
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-200">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Frequently used admin functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-20 flex-col space-y-2 bg-gray-700 text-gray-200 hover:bg-gray-600">
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View Orders</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              <Users className="h-5 w-5" />
              <span>Manage Users</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2 bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}