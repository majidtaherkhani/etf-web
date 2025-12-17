import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges class names safely (e.g., handles conflicts like 'p-4' vs 'p-6')
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
