interface LoadingErrorOverlayProps {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
}

export default function LoadingErrorOverlay({
  loading,
  error,
  loadingMessage = "Loading...",
}: LoadingErrorOverlayProps) {
  if (!loading && !error) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl mica-card">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="spinner mb-4"></div>
          <div className="text-fluent-secondary text-lg">{loadingMessage}</div>
        </div>
      ) : error ? (
        <div className="rounded-2xl p-8 mica-card w-full max-w-lg mx-4">
          <div className="notification notification-error">
            <span className="text-xl">&#9888;&#65039;</span>
            <div>
              <h3 className="font-semibold">Error loading data</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
