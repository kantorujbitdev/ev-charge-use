import { AppProps } from "next/app";
import { Toaster } from "components/ui/toaster";
import { Toaster as SonnerToaster } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "contexts/AuthContext";
import { ChargingProvider } from "contexts/ChargingContext";
import { Layout } from "components/Layout";

// Create a query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ChargingProvider>
            <Toaster />
            <SonnerToaster />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChargingProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
