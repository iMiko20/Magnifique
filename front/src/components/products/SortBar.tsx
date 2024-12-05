import React from 'react';
import { ListFilter } from 'lucide-react';

interface SortBarProps {
  totalProducts: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SortBar({ totalProducts, sortBy, onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <ListFilter className="w-5 h-5 text-gray-400" />
        <span className="text-gray-600">
          {totalProducts} productos encontrados
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">Ordenar por:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border-gray-300 rounded-md text-gray-700 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="featured">Destacados</option>
          <option value="newest">Más nuevos</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
}
