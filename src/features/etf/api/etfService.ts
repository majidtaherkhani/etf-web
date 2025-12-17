import { apiClient } from "@/api/client";
import { ETFResponseDTO } from "../types/api";
import { mapDTOtoModel } from "../utils/mappers";
import { ETFAnalysis } from "../types";

export const analyzeETF = async (file: File): Promise<ETFAnalysis> => {
  const formData = new FormData();
  formData.append('file', file);

  // 1. Call API (Returns DTO)
  const { data: dto } = await apiClient.post<ETFResponseDTO>('/etf/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // Log raw backend response
  console.log('📥 Raw backend response:', JSON.stringify(dto, null, 2));

  // 2. Map DTO to Domain Model
  const mappedData = mapDTOtoModel(dto);
  
  // Log mapped result
  console.log('🔄 Mapped domain model:', mappedData);
  
  return mappedData;
};