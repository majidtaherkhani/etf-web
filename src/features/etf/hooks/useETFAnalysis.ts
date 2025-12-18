import { useState } from 'react';
import { analyzeETF } from '../api/etfService';
import { ETFAnalysis } from '../types/models';

export const useETFAnalysis = () => {
  const [data, setData] = useState<ETFAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAndAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeETF(file);
      setData(result);
    } catch (err: any) {
      console.error('❌ ETF analysis failed:', err);
      // Extract error message from various possible error formats
      const errorMessage = 
        err?.response?.data?.message || 
        err?.response?.data?.detail || 
        err?.message || 
        "Failed to process ETF. Please ensure the CSV format is correct.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, uploadAndAnalyze, reset };
};