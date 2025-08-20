import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


export default function ClientLayout() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-800 text-gray-200">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}