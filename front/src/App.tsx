import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogIn, ArrowRight, ArrowLeft } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { Carousel } from './components/Carousel';
import { ProductsPage } from './pages/ProductsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import axios from 'axios';
import type { Product } from './types';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 p-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full transition-colors z-50"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [vestidos, setVestidos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToProducts = () => {
    navigate('/products');
  };

  useEffect(() => {
    const fetchVestidos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vestidos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token si es necesario.
          },
        });
        setVestidos(response.data);
      } catch (err) {
        setError('No se pudieron cargar los vestidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchVestidos();
  }, []);

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900">Magnifique</h1>
              <nav className="hidden md:flex space-x-1">
                {[{ id: 'home', label: 'Inicio' }, { id: 'nuevos', label: 'Nuevos' }, { id: 'ofertas', label: 'Ofertas' }, { id: 'tendencias', label: 'Tendencias' }].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Carousel />
          <div className="text-center my-12">
            <button
              onClick={goToProducts}
              className="inline-block text-3xl font-bold text-gray-900 hover:text-pink-600 transition-colors relative group"
            >
              Ver todo el catálogo
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>
          </div>
        </div>

        <div id="nuevos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Nuevos Productos</h2>
            <button
              onClick={goToProducts}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold"
            >
              Ver Todos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {loading ? (
            <p className="text-gray-600">Cargando vestidos...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vestidos.map((vestido) => (
                <ProductCard key={vestido.id} product={vestido} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...pageTransition} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><BackButton /><ProductsPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><BackButton /><LoginPage /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><BackButton /><AdminPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><BackButton /><AboutPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><BackButton /><ContactPage /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><BackButton /><FAQPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
