import { useETFAnalysis } from './features/etf/hooks/useETFAnalysis';
import { UploadSection } from './features/etf/components/UploadSection';
import { DashboardView } from './features/etf/components/DashboardView';

function App() {
  const { data, loading, error, setError, uploadAndAnalyze, reset } = useETFAnalysis();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex justify-between items-center animate-in fade-in">
            <span>{error}</span>
            <button onClick={reset} className="text-red-900 font-bold hover:underline">Dismiss</button>
          </div>
        )}

        {/* Main Route Logic */}
        {!data ? (
          <UploadSection 
            onUpload={uploadAndAnalyze} 
            isLoading={loading} 
            onError={setError} 
          />
        ) : (
          <DashboardView data={data} onReset={reset} />
        )}

      </div>
    </div>
  );
}

export default App;