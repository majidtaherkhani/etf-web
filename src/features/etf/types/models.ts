// Domain Model Types
export interface Holding {
  ticker: string;
  weight: number; // Weight of this holding in the ETF
  price: number; // Price of the individual ticker
  value: number; // Value = price * weight
}

export interface HistoryPoint {
  date: string;
  nav: number; // Net Asset Value
}

export interface ETFAnalysis {
  name: string; // ETF name
  currentPrice: number; // Current ETF price
  history: HistoryPoint[];
  holdings: Holding[];
}
