// API Response DTO Types
export interface LatestPriceDTO {
  ticker: string;
  price: number;
}

export interface TimeSeriesPointDTO {
  date: string;
  price: number;
}

export interface ETFResponseDTO {
  etf_name: string;
  latest_close: number;
  etf_time_series: TimeSeriesPointDTO[];
  latest_prices: LatestPriceDTO[];
}
