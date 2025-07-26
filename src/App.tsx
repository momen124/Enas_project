import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ClientLayout from './components/Layout/ClientLayout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import './i18n';
import './index.css';
import AdminDashboard from './pages/admin/page';
import OrdersPage from './pages/admin/orders/page';
import ProductsPage from './pages/admin/products/page';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-700 text-gray-200">
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:slug" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/products" element={<ProductsPage />} />
          </Route>
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2D3748',
              color: '#E5E7EB',
              border: '1px solid #4A5568',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;