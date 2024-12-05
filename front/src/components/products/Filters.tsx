import React, { useState } from 'react';
import axios from 'axios';
import type { FilterState } from '../../pages/ProductsPage';
import { Slider } from '../ui/Slider';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Rosa'];

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const toggleOnlyOffers = (checked: boolean) => {
    onFiltersChange({ ...filters, onlyOffers: checked });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onFiltersChange({ ...filters, colors: [color] }); // Aseguramos que solo se envía un color.
  };

  const sendFiltersToAPI = async () => {
    try {
      const payload = {
        ...filters,
        colors: selectedColor ? [selectedColor] : [],
      };
      const response = await axios.post('http://localhost:8000/api/vestidos/filtro', payload);
      console.log('Filters sent to API:', payload);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending filters to API:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* Tamaño */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tamaño</h3>
        <div className="space-y-2">
          {SIZES.map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => toggleSize(size)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color</h3>
        <div className="space-y-2">
          {COLORS.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={() => handleColorChange(color)}
                className="rounded-full border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Precio</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Ofertas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ofertas</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.onlyOffers}
            onChange={(e) => toggleOnlyOffers(e.target.checked)}
            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
          />
          <span className="ml-2 text-gray-700">Solo ofertas</span>
        </label>
      </div>

      {/* Botón para aplicar filtros */}
      <div className="flex justify-end">
        <button
          onClick={sendFiltersToAPI}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
