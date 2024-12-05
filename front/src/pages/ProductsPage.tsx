import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Filters } from '../components/products/Filters';
import { ProductGrid } from '../components/products/ProductGrid';
import type { Product } from '../types';

// Estado de filtros
export interface FilterState {
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  onlyOffers: boolean;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    onlyOffers: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vestidos/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/vestidos/filtro',
        filters
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos filtrados:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Filters filters={filters} onFiltersChange={setFilters} />
        <div className="md:col-span-3">
          {/* Productos */}
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
