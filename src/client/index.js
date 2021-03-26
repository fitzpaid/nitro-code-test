import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary
          FallbackComponent={() => (
            <div>Something went wrong, try again later</div>
          )}
        >
          <App />
        </ErrorBoundary>
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
