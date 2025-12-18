import { Search } from "lucide-react";
import { ETFAnalysis } from "../types/models";
import { useETFTable } from "../hooks/useETFTable";
import { ZoomableLineChart } from "@/components/charts/ZoomableLineChart";
import { HoldingsBarChart } from "@/components/charts/HoldingsBarChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Props {
  data: ETFAnalysis;
  onReset: () => void;
}

export const DashboardView = ({ data, onReset }: Props) => {
  const { holdings: sortedAndFilteredHoldings, searchQuery, setSearchQuery, sortConfig, quickActions } = useETFTable(data.holdings);

  const topHoldings = [...data.holdings]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.name} Analysis</h1>
          <div className="flex gap-4 mt-2 text-sm font-medium">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              Price: ${data.currentPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <Button variant="outline" onClick={onReset}>Analyze Another</Button>
      </div>

      {/* Main Chart */}
      <ZoomableLineChart data={data.history} />

      {/* Grid Layout for Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Table Section */}
        <Card className="h-[350px] flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-700">All Holdings</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ticker..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm text-center">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-center">Ticker</th>
                  <th className="px-6 py-3 text-center">Weight</th>
                  <th className="px-6 py-3 text-center">Latest Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedAndFilteredHoldings.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No results found
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredHoldings.map((h) => (
                    <tr key={h.ticker} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900 text-center">{h.ticker}</td>
                      <td className="px-6 py-3 text-center">{h.weight.toFixed(4)}</td>
                      <td className="px-6 py-3 text-center">${h.price.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <HoldingsBarChart data={topHoldings} />
      </div>
    </div>
  );
};