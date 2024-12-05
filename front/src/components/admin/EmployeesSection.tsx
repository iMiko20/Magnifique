import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Pencil, Trash2 } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
  editingEmployee: Employee | null;
}

function EmployeeModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  editingEmployee 
}: EmployeeModalProps) {
  const [username, setUsername] = useState(editingEmployee?.username || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (editingEmployee) {
      setUsername(editingEmployee.username);
      setPassword('');
    }
  }, [editingEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee: Employee = {
      id: editingEmployee?.id || Date.now(),
      username,
      password: password || editingEmployee?.password || '',
      createdAt: editingEmployee?.createdAt || new Date().toISOString(),
    };

    onSubmit(employee);
    handleClose();
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">
              {editingEmployee ? 'Editar Empleado' : 'Agregar Empleado'}
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {editingEmployee ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required={!editingEmployee}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                {editingEmployee ? 'Guardar Cambios' : 'Agregar Empleado'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export function EmployeesSection() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleSubmit = (employee: Employee) => {
    setEmployees((prev) => {
      if (editingEmployee) {
        return prev.map((emp) => (emp.id === employee.id ? employee : emp));
      }
      return [...prev, employee];
    });
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Empleados</h2>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Agregar Empleado
        </button>
      </div>

      <div className="space-y-4">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No hay empleados registrados
          </p>
        ) : (
          <div className="grid gap-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{employee.username}</p>
                  <p className="text-sm text-gray-500">
                    Registrado el:{' '}
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="p-2 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        onSubmit={handleSubmit}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}