import { ETFResponseDTO } from "../types/api";
import { ETFAnalysis } from "../types/models";

/**
 * Maps the API response DTO to the domain model
 */
export const mapDTOtoModel = (dto: ETFResponseDTO): ETFAnalysis => {
  const timeSeries = dto.etf_time_series;
  const sortedTimeSeries = [...timeSeries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return {
    name: dto.etf_name,
    currentPrice: dto.latest_close, // ETF price
    history: sortedTimeSeries.map((point) => ({
      date: point.date,
      nav: point.nav, // ETF NAV at that point in time
    })),
    holdings: dto.latest_prices.map((holding) => ({
      ticker: holding.ticker,
      weight: holding.weight,
      price: holding.price, // Individual ticker price
      value: holding.value, // Value calculated by backend
    })),
  };
};
