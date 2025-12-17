import { ETFAnalysis } from "../types";
import { ZoomableLineChart } from "@/components/charts/ZoomableLineChart";
import { HoldingsBarChart } from "@/components/charts/HoldingsBarChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Props {
  data: ETFAnalysis;
  onReset: () => void;
}

export const DashboardView = ({ data, onReset }: Props) => {
  // Logic: Get top 5 holdings
  const topHoldings = [...data.holdings]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
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
          <div className="p-4 border-b bg-gray-50 font-semibold text-gray-700">All Holdings</div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3">Ticker</th>
                  <th className="px-6 py-3">Weight</th>
                  <th className="px-6 py-3">Latest Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.holdings.map((h) => (
                  <tr key={h.ticker} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{h.ticker}</td>
                    <td className="px-6 py-3">{h.weight.toFixed(4)}</td>
                    <td className="px-6 py-3">${h.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bar Chart Section */}
        <HoldingsBarChart data={topHoldings} />
      </div>
    </div>
  );
};