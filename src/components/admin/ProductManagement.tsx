import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Upload, Download, Tag, Package } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Egyptian Cotton Sheet Set',
    category: 'Bed Sheets',
    price: 650,
    stock: 25,
    status: 'active',
    image: '/placeholder.svg?height=60&width=60',
    variants: ['Single', 'Double', 'King'],
    colors: ['White', 'Beige', 'Grey'],
  },
  {
    id: '2',
    name: 'Honeycomb Coverlet',
    category: 'Coverlets',
    price: 1350,
    stock: 8,
    status: 'low_stock',
    image: '/placeholder.svg?height=60&width=60',
    variants: ['Single', 'Double'],
    colors: ['Olive', 'Rose', 'Yellow'],
  },
  {
    id: '3',
    name: 'Luxury Towel Set',
    category: 'Towels',
    price: 500,
    stock: 0,
    status: 'out_of_stock',
    image: '/placeholder.svg?height=60&width=60',
    variants: ['Bath Set', 'Hand Set'],
    colors: ['White', 'Blue', 'Pink'],
  },
];

export default function ProductManagement() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'low_stock':
        return <Badge variant="secondary">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-gray-900 text-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400">Manage your product catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-gray-200">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Product</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new product in your catalog
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      className="bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-300">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 text-gray-200 border-gray-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-gray-200 border-gray-600">
                        <SelectItem value="bed-sheets">Bed Sheets</SelectItem>
                        <SelectItem value="coverlets">Coverlets</SelectItem>
                        <SelectItem value="towels">Towels</SelectItem>
                        <SelectItem value="pillows">Pillows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Product description"
                    className="bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-300">
                      Price (EGP)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      className="bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-gray-300">
                      Cost (EGP)
                    </Label>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="0"
                      className="bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock" className="text-gray-300">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      className="bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Drag and drop images here, or click to select</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddProductOpen(false)}
                  className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsAddProductOpen(false)}
                  className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                >
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4 text-gray-200">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-700 text-gray-200">
            All Products
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-gray-700 text-gray-200">
            Active
          </TabsTrigger>
          <TabsTrigger value="low-stock" className="data-[state=active]:bg-gray-700 text-gray-200">
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="out-of-stock" className="data-[state=active]:bg-gray-700 text-gray-200">
            Out of Stock
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-gray-700 text-gray-200">
            Draft
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-8 bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500"
            />
          </div>
          <Button variant="outline" className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">
            <Tag className="mr-2 h-4 w-4" />
            Categories
          </Button>
        </div>

        <TabsContent value="all">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200">Product List</CardTitle>
              <CardDescription className="text-gray-400">Manage and organize your products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                    </TableHead>
                    <TableHead className="text-gray-300">Product</TableHead>
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Price</TableHead>
                    <TableHead className="text-gray-300">Stock</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                          <div>
                            <div className="font-medium text-gray-200">{product.name}</div>
                            <div className="text-sm text-gray-400">
                              {product.variants.length} variants, {product.colors.length} colors
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">{product.category}</TableCell>
                      <TableCell className="text-gray-200">{product.price} EGP</TableCell>
                      <TableCell className="text-gray-200">{product.stock}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-200">
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700">
                              <Package className="mr-2 h-4 w-4" />
                              Manage Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}