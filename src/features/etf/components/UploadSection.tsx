import { FileUpload } from "@/components/ui/FileUpload";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
  onUpload: (file: File) => void;
  isLoading: boolean;
  onError: (message: string) => void;
}

export const UploadSection = ({ onUpload, isLoading, onError }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
        <Spinner />
        <p className="mt-6 text-xl font-medium text-gray-600">Reconstructing ETF History...</p>
        <p className="text-sm text-gray-400 mt-2">This usually takes 2-3 seconds</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">ETF Analyzer</h1>
        <p className="text-gray-500 text-lg">Upload a weights CSV to visualize historical performance.</p>
      </div>
      <FileUpload 
        onFileSelect={onUpload} 
        label="Drag & drop your ETF CSV here" 
        accept=".csv"
        helperText="Supports .csv files only"
        onError={onError}
      />
    </div>
  );
};
