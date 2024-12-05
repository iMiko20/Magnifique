import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import type { KanbanItem } from '../../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentals: KanbanItem[];
}

const CONTRACT_TEMPLATE = `CONTRATO DE ARRENDAMIENTO DE VESTIDO

En la ciudad de Durango, Dgo., siendo las [HORA_INICIO] horas del día [FECHA_INICIO], comparecen:

Por una parte, MAGNIFIQUE RENTA Y VENTA DE VESTIDOS, en adelante "EL ARRENDADOR"
Y por la otra parte [NOMBRE_CLIENTE], en adelante "EL ARRENDATARIO"

DECLARAN:

1. Que EL ARRENDADOR es propietario del vestido: [NOMBRE_VESTIDO]

2. Que EL ARRENDATARIO desea tomar en arrendamiento dicho vestido.

DATOS DEL ARRENDATARIO:
Nombre: [NOMBRE_CLIENTE]
Dirección: [DIRECCION_CLIENTE]
Teléfono: [TELEFONO_CLIENTE]

CLÁUSULAS:

PRIMERA.- EL ARRENDADOR da en arrendamiento a EL ARRENDATARIO el vestido mencionado.

SEGUNDA.- El arrendamiento tendrá una duración definida:
- Fecha y hora de inicio: [FECHA_INICIO] a las [HORA_INICIO] horas
- Fecha y hora de devolución: [FECHA_DEVOLUCION] a las [HORA_DEVOLUCION] horas

TERCERA.- EL ARRENDATARIO se compromete a devolver el vestido en las mismas condiciones en que lo recibió.

CUARTA.- En caso de daño o pérdida, EL ARRENDATARIO cubrirá el costo total del vestido.

Firman de conformidad:

_______________________                    _______________________
     EL ARRENDADOR                             EL ARRENDATARIO`;

function ContractModal({ isOpen, onClose, rentals }: ContractModalProps) {
  const [selectedRental, setSelectedRental] = useState<KanbanItem | null>(null);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  const getContractText = () => {
    if (!selectedRental) return CONTRACT_TEMPLATE;

    return CONTRACT_TEMPLATE
      .replace(/\[NOMBRE_CLIENTE\]/g, selectedRental.client)
      .replace('[DIRECCION_CLIENTE]', selectedRental.clientAddress)
      .replace('[TELEFONO_CLIENTE]', selectedRental.clientPhone)
      .replace('[NOMBRE_VESTIDO]', selectedRental.title)
      .replace(/\[FECHA_INICIO\]/g, formatDate(selectedRental.date))
      .replace(/\[HORA_INICIO\]/g, selectedRental.startTime || '')
      .replace(
        /\[FECHA_DEVOLUCION\]/g,
        selectedRental.returnDate ? formatDate(selectedRental.returnDate) : ''
      )
      .replace(/\[HORA_DEVOLUCION\]/g, selectedRental.endTime || '');
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
              Generar Contrato
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Renta
              </label>
              <select
                value={selectedRental?.id || ''}
                onChange={(e) => {
                  const rental = rentals.find(
                    (r) => r.id === Number(e.target.value)
                  );
                  setSelectedRental(rental || null);
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">Seleccione una renta...</option>
                {rentals.map((rental) => (
                  <option key={rental.id} value={rental.id}>
                    {rental.title} - {rental.client}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contrato
              </label>
              <textarea
                value={getContractText()}
                readOnly
                className="w-full h-96 rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-pink-500 focus:ring-pink-500 font-mono text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedRental}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-400"
              >
                Imprimir Contrato
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export function ContractsSection({ rentals }: { rentals: KanbanItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contratos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Crear Contrato
        </button>
      </div>

      <ContractModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rentals={rentals.filter((item) => item.section === 'rentas')}
      />
    </div>
  );
}