import { ETFAnalysis } from "../types/models";
import { useETFTable } from "../hooks/useETFTable";
import { ZoomableLineChart } from "@/components/charts/ZoomableLineChart";
import { HoldingsBarChart } from "@/components/charts/HoldingsBarChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { ETFTableToolbar } from "./ETFTableToolbar";

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
      <ZoomableLineChart data={data.history} title="Historical Net Asset Value" />

      {/* Grid Layout for Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Table Section */}
        <Card className="h-[350px] flex flex-col">
          <ETFTableToolbar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortConfig={sortConfig}
            quickActions={quickActions}
          />
          <Table 
            data={sortedAndFilteredHoldings}
            columns={[
              { 
                header: "Ticker", 
                accessor: (h) => <span className="font-medium text-gray-900">{h.ticker}</span> 
              },
              { 
                header: "Weight", 
                accessor: (h) => h.weight.toFixed(4) 
              },
              { 
                header: "Latest Price", 
                accessor: (h) => `$${h.price.toFixed(2)}` 
              }
            ]}
          />
        </Card>

        <HoldingsBarChart data={topHoldings} title="Top 5 Holdings" dataKeys={{ label: "ticker", value: "value" }} />
      </div>
    </div>
  );
};