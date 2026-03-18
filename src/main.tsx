import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/app/providers/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from 'nuqs/adapters/react';
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <NuqsAdapter>
            <TooltipProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </TooltipProvider>
        </NuqsAdapter>
    </BrowserRouter>

)