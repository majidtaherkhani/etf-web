import { useState } from 'react';
import { analyzeETF } from '../api/etfService';
import { ETFAnalysis } from '../types';

export const useETFAnalysis = () => {
  const [data, setData] = useState<ETFAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAndAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🚀 Starting ETF analysis for file:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
      const result = await analyzeETF(file);
      console.log('✅ ETF analysis successful:', result);
      setData(result);
    } catch (err) {
      console.error('❌ ETF analysis failed:', err);
      setError("Failed to process ETF. Please ensure the CSV format is correct.");
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