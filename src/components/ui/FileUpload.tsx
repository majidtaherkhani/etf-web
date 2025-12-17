import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
  label: string;
}

export const FileUpload = ({ onFileSelect, label }: Props) => {
  return (
    <div className="relative group border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} />
        </div>
        <p className="text-lg font-semibold text-gray-600 group-hover:text-blue-700">{label}</p>
        <p className="text-sm text-gray-400">Supports .csv files only</p>
      </div>
      <input 
        type="file" 
        accept=".csv"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
      />
    </div>
  );
};