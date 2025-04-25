import { ExchangeRates } from '../lib/types';

const API_URL = 'https://ve.dolarapi.com/v1/dolares';

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las tasas de cambio');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 