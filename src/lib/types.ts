export interface ExchangeRate {
  fuente: 'oficial' | 'paralelo' | 'bitcoin';
  nombre: string;
  compra: number | null;
  venta: number | null;
  promedio: number;
  fechaActualizacion: string;
}

export type ExchangeRates = ExchangeRate[]; 