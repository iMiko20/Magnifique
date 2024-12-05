import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice =
    typeof product.precio_renta === 'number'
      ? product.precio_renta.toFixed(2)
      : '0.00';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imagen}
          alt={product.modelo}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.modelo} - {product.categoria}
        </h3>
        <p className="text-gray-600 mb-4">
          Talla: {product.talla}, Color: {product.color}, Marca: {product.marca}
        </p>
        <div className="flex items-center justify-end">
          <span className="text-2xl font-bold text-gray-900">
            ${formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
