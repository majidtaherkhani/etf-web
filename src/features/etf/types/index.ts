// Domain Model Types
export interface Holding {
  ticker: string;
  weight: number;
  price: number;
  value: number;
}

export interface HistoryPoint {
  date: string;
  price: number;
}

export interface ETFAnalysis {
  name: string;
  currentPrice: number;
  totalReturn: number;
  history: HistoryPoint[];
  holdings: Holding[];
}
