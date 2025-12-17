import { ETFResponseDTO } from "../types/api";
import { ETFAnalysis } from "../types";

/**
 * Maps the API response DTO to the domain model
 */
export const mapDTOtoModel = (dto: ETFResponseDTO): ETFAnalysis => {
  console.log('🔍 Mapping DTO to model. DTO structure:', {
    etf_name: dto.etf_name,
    latest_close: dto.latest_close,
    time_series_length: dto.etf_time_series?.length,
    latest_prices_length: dto.latest_prices?.length,
  });

  const timeSeries = dto.etf_time_series;
  const sortedTimeSeries = [...timeSeries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate total return: percentage change from first to last price
  const firstPrice = sortedTimeSeries[0]?.price || dto.latest_close;
  const latestPrice = dto.latest_close;
  const totalReturn = firstPrice > 0 
    ? ((latestPrice - firstPrice) / firstPrice) * 100 
    : 0;

  // Calculate equal weights for holdings (since backend doesn't provide weights)
  const equalWeight = dto.latest_prices.length > 0 
    ? 1 / dto.latest_prices.length 
    : 0;

  console.log('📊 Mapping details:', {
    firstPrice,
    latestPrice,
    totalReturn: totalReturn.toFixed(2) + '%',
    equalWeight: equalWeight.toFixed(4),
    holdingsCount: dto.latest_prices.length,
  });

  const result = {
    name: dto.etf_name,
    currentPrice: dto.latest_close,
    totalReturn: totalReturn,
    history: sortedTimeSeries.map((point) => ({
      date: point.date,
      price: point.price,
    })),
    holdings: dto.latest_prices.map((holding) => ({
      ticker: holding.ticker,
      weight: equalWeight,
      price: holding.price,
      value: holding.price, // Use price as value for sorting purposes
    })),
  };

  console.log('✅ Mapping complete. Result:', {
    name: result.name,
    currentPrice: result.currentPrice,
    totalReturn: result.totalReturn.toFixed(2) + '%',
    historyPoints: result.history.length,
    holdingsCount: result.holdings.length,
  });

  return result;
};
