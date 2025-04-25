import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Highlight matching text in a string
export function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  
  if (index >= 0) {
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    
    return {
      before,
      match,
      after
    };
  }
  
  return { before: text, match: "", after: "" };
}

// Format number as currency
export function formatCurrency(amount: number, currency: string = "₹") {
  return `${currency}${amount.toLocaleString()}`;
}
