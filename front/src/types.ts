export interface Product {
  id: number;
  modelo: string;
  talla: string;
  color: string;
  marca: string;
  precio_renta: number;
  precio_venta: number;
  costo_reposicion: number;
  proveedor: string;
  imagen: string;
  cantidad: number;
  categoria: 'Boda' | 'Gala' | 'Formal' | 'Coctel' | 'Fiesta';
  estado: 'Nuevo' | 'Usado' | 'Dañado';
  disponibilidad: boolean;
}

export interface Employee {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

export interface Rental {
  id_renta: number;
  id_vestido: number;
  nombre_cliente: string;
  direccion: string;
  telefono: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  imagen_identificacion: string;
  fecha_renta: string;
  fecha_devolucion_programada: string;
  fecha_devolucion_real?: string;
  cantidad_apartado: number;
  cantidad_pendiente: number;
  ajustes?: string;
  observaciones?: string;
  estado: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  penalizacion?: number;
  forma_pago: string;
}

export interface Sale {
  id: number;
  id_vestido: number;
  nombre_cliente: string;
  direccion: string;
  telefono: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  imagen_identificacion: string;
  precio_venta: number;
  cantidad: number;
  forma_pago: string;
  fecha_venta: string;
}

export interface Payment {
  id_transaccion: number;
  tipo: 'Renta' | 'Venta';
  monto: number;
  forma_pago: string;
  fecha_pago: string;
  estado_pago: 'Pendiente' | 'Completado' | 'Cancelado';
  observaciones?: string;
}