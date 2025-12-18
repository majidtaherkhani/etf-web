import { useState, useMemo } from 'react';
import { Holding } from '../types/models';

type SortKey = 'ticker' | 'weight' | 'price' | 'value';
type SortDirection = 'asc' | 'desc';
type SortConfig = { key: SortKey; direction: SortDirection };

export const useETFTable = (holdings: Holding[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const processedHoldings = useMemo(() => {
    const filtered = holdings.filter(h => 
      h.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!sortConfig) return filtered;

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [holdings, searchQuery, sortConfig]);

  const sortByValue = () => setSortConfig({ key: 'value', direction: 'desc' });
  const sortByPrice = () => setSortConfig({ key: 'price', direction: 'desc' });
  const sortByWeight = () => setSortConfig({ key: 'weight', direction: 'desc' });
  const sortAz = () => setSortConfig({ key: 'ticker', direction: 'asc' });
  

  const reset = () => {
    setSearchQuery("");
    setSortConfig(null); 
  };

  return {
    holdings: processedHoldings,
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
    quickActions: { sortByValue, sortByPrice, sortByWeight, sortAz, reset }
  };
};