import { UploadCloud } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
  onFileSelect: (file: File) => void;
  label: string;
  accept?: string;
  helperText?: string;
  onError?: (message: string) => void;
}

export const FileUpload = ({ onFileSelect, label, accept, helperText, onError }: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (accept) {
      const allowedExtensions = accept.split(',').map(ext => ext.trim().toLowerCase());
      const fileName = file.name.toLowerCase();
      const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));
      
      if (!isValid) {
        onError?.(`Invalid file type. Please select a ${accept} file.`);
        e.target.value = ''; // Reset input
        return;
      }
    }

    onFileSelect(file);
  };

  return (
    <div className="relative group border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} />
        </div>
        <p className="text-lg font-semibold text-gray-600 group-hover:text-blue-700">{label}</p>
        {helperText && <p className="text-sm text-gray-400">{helperText}</p>}
      </div>
      <input 
        type="file" 
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
};
