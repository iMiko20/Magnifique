import React, { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Product } from '../../types';

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (article: Omit<Product, 'id'>) => void;
}

function AddArticleModal({ isOpen, onClose, onSubmit }: AddArticleModalProps) {
  const [modelo, setModelo] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [marca, setMarca] = useState('');
  const [precioRenta, setPrecioRenta] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [costoReposicion, setCostoReposicion] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [imagen, setImagen] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [categoria, setCategoria] = useState<Product['categoria']>('Boda');
  const [estado, setEstado] = useState<Product['estado']>('Nuevo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const article: Omit<Product, 'id'> = {
      modelo,
      talla,
      color,
      marca,
      precio_renta: parseFloat(precioRenta),
      precio_venta: parseFloat(precioVenta),
      costo_reposicion: parseFloat(costoReposicion),
      proveedor,
      imagen,
      cantidad: parseInt(cantidad),
      categoria,
      estado,
      disponibilidad: true
    };

    onSubmit(article);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg w-full max-w-3xl mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">
              Agregar Nuevo Vestido
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Modelo
                </label>
                <input
                  type="text"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Talla
                </label>
                <select
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  <option value="">Seleccionar talla</option>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio de Renta
                </label>
                <input
                  type="number"
                  value={precioRenta}
                  onChange={(e) => setPrecioRenta(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio de Venta
                </label>
                <input
                  type="number"
                  value={precioVenta}
                  onChange={(e) => setPrecioVenta(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Costo de Reposición
                </label>
                <input
                  type="number"
                  value={costoReposicion}
                  onChange={(e) => setCostoReposicion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proveedor
                </label>
                <input
                  type="text"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen URL
                </label>
                <input
                  type="url"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as Product['categoria'])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  {['Boda', 'Gala', 'Formal', 'Coctel', 'Fiesta'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as Product['estado'])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  {['Nuevo', 'Usado', 'Dañado'].map((est) => (
                    <option key={est} value={est}>
                      {est}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Agregar Vestido
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export function ArticlesSection() {
  const [selectedCategory, setSelectedCategory] = useState<Product['categoria']>('Boda');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Product[]>([]);

  const filteredArticles = articles.filter(
    (article) => article.categoria === selectedCategory
  );

  const handleAddArticle = async (articleData: Omit<Product, 'id'>) => {
    try {
      // Realiza la solicitud POST al backend
      const response = await axios.post('http://localhost:8000/api/vestidos', articleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });      

      // Actualiza el estado con el nuevo vestido recibido del backend
      setArticles((prev) => [...prev, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar el vestido:', error);
      alert('No se pudo agregar el vestido. Inténtalo nuevamente.');
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este vestido?')) {
      setArticles((prev) => prev.filter((article) => article.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Artículos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Agregar Vestido
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          {['Boda', 'Gala', 'Formal', 'Coctel', 'Fiesta'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Product['categoria'])}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 mb-4">
              <img
                src={article.imagen}
                alt={article.modelo}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="p-1 bg-white rounded-full shadow hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{article.modelo}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Marca: {article.marca}</p>
              <p>Talla: {article.talla}</p>
              <p>Color: {article.color}</p>
              <p>Estado: {article.estado}</p>
              <p>Cantidad: {article.cantidad}</p>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-pink-600">Renta: ${article.precio_renta}</span>
              <span className="text-gray-900">Venta: ${article.precio_venta}</span>
            </div>
          </div>
        ))}
      </div>

      <AddArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddArticle}
      />
    </div>
  );
}