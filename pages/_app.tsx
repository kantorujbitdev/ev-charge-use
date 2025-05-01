// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChargingProvider } from "@/contexts/ChargingContext";
import { Layout } from "@/components/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

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
