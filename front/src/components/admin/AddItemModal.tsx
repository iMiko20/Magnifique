import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { X } from 'lucide-react';
import type { Rental } from '../../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Rental) => void;
  section: string | null;
  editingItem: Rental | null;
}

export function AddItemModal({
  isOpen,
  onClose,
  onSubmit,
  section,
  editingItem
}: AddItemModalProps) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [imagenIdentificacion, setImagenIdentificacion] = useState('');
  const [fechaRenta, setFechaRenta] = useState<Date | null>(new Date());
  const [fechaDevolucion, setFechaDevolucion] = useState<Date | null>(null);
  const [cantidadApartado, setCantidadApartado] = useState(0);
  const [cantidadPendiente, setCantidadPendiente] = useState(0);
  const [ajustes, setAjustes] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [formaPago, setFormaPago] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct || !nombreCliente || !fechaRenta) return;

    const item: Rental = {
      id_renta: editingItem?.id_renta || Date.now(),
      id_vestido: parseInt(selectedProduct),
      nombre_cliente: nombreCliente,
      direccion,
      telefono,
      tipo_identificacion: tipoIdentificacion,
      numero_identificacion: numeroIdentificacion,
      imagen_identificacion: imagenIdentificacion,
      fecha_renta: fechaRenta.toISOString(),
      fecha_devolucion_programada: fechaDevolucion?.toISOString() || '',
      cantidad_apartado: cantidadApartado,
      cantidad_pendiente: cantidadPendiente,
      ajustes,
      observaciones,
      estado: 'Pendiente',
      forma_pago: formaPago
    };

    onSubmit(item);
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
              {editingItem ? 'Editar ' : 'Nueva '} 
              {section === 'rentas' ? 'Renta' : 'Venta'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Vestido Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vestido
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required
              >
                <option value="">Seleccionar vestido</option>
                {/* Add product options here */}
              </select>
            </div>

            {/* Cliente Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Cliente
                </label>
                <input
                  type="text"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Identificación
                </label>
                <select
                  value={tipoIdentificacion}
                  onChange={(e) => setTipoIdentificacion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="INE">INE</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Licencia">Licencia de conducir</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  value={numeroIdentificacion}
                  onChange={(e) => setNumeroIdentificacion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen de Identificación
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload
                    }
                  }}
                  className="mt-1 block w-full"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            {/* Fechas y Pagos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Renta
                </label>
                <DatePicker
                  selected={fechaRenta}
                  onChange={(date) => setFechaRenta(date)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Devolución
                </label>
                <DatePicker
                  selected={fechaDevolucion}
                  onChange={(date) => setFechaDevolucion(date)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={fechaRenta}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad Apartado
                </label>
                <input
                  type="number"
                  value={cantidadApartado}
                  onChange={(e) => setCantidadApartado(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad Pendiente
                </label>
                <input
                  type="number"
                  value={cantidadPendiente}
                  onChange={(e) => setCantidadPendiente(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Forma de Pago
                </label>
                <select
                  value={formaPago}
                  onChange={(e) => setFormaPago(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                >
                  <option value="">Seleccionar forma de pago</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
            </div>

            {/* Ajustes y Observaciones */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ajustes
                </label>
                <textarea
                  value={ajustes}
                  onChange={(e) => setAjustes(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
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
                {editingItem ? 'Guardar Cambios' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}