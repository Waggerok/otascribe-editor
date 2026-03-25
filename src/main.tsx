import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/app/providers/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from 'nuqs/adapters/react';
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/shared/generated/api/query-client.ts";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
                <TooltipProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </TooltipProvider>
            </NuqsAdapter>
        </QueryClientProvider>
    </BrowserRouter>
)