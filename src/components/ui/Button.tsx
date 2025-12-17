import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props} />
  );
};