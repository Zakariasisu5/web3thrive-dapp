// import modules

"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";

// Set up a React Query client.
const queryClient = new QueryClient();

export default function Providers({ children, cookie }) {
  // initial state
  const initialState = cookieToInitialState(config, cookie);

  // Wrap app with Wagmi, RainbowKit and React Query context.
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#fff",
            accentColorForeground: "#000",
            borderRadius: "large",
            fontStack: "poppins",
            overlayBlur: "small",
          })} modalSize="compact">
            {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
