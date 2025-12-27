import { SearchInput } from "@/components/ui/SearchInput";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  quickActions: {
    sortByValue: () => void;
    sortByWeight: () => void;
    sortByPrice: () => void;
    reset: () => void;
  };
}

export const ETFTableToolbar = ({ searchQuery, onSearchChange, sortConfig, quickActions }: Props) => {
  return (
    <div className="p-4 border-b bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">All Holdings</h3>
        <SearchInput 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search ticker..."
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={quickActions.sortByValue}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            sortConfig?.key === 'value' && sortConfig?.direction === 'desc'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Most Valuable
        </button>
        
        <button
          onClick={quickActions.sortByWeight}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            sortConfig?.key === 'weight' && sortConfig?.direction === 'desc'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Highest Weight
        </button>
        <button
          onClick={quickActions.sortByPrice}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            sortConfig?.key === 'price' && sortConfig?.direction === 'desc'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Highest Price
        </button>
        
        <button
          onClick={quickActions.reset}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            searchQuery === "" && !sortConfig
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

