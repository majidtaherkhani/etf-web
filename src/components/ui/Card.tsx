import { ReactNode } from "react";
import { cn } from "@/utils/utils";

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden", className)}>
      {children}
    </div>
  );
};