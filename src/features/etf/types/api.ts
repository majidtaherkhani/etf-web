// API Response DTO Types
export interface LatestPriceDTO {
  ticker: string;
  price: number;
  weight: number;
  value: number;
}

export interface TimeSeriesPointDTO {
  date: string;
  nav: number; // Net Asset Value
}

export interface ETFResponseDTO {
  etf_name: string;
  latest_close: number;
  etf_time_series: TimeSeriesPointDTO[];
  latest_prices: LatestPriceDTO[];
}
