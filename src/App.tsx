import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AdminProvider } from "./context/AdminContext";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import Scholarships from "./pages/admin/Scholarships";
import Login from "./pages/admin/Login";
import CandidatureLayout from "./pages/admin/CandidatureLayout";
import CandidatureDossierTab from "./pages/admin/CandidatureDossierTab";
import CandidatureMatriceTab from "./pages/admin/CandidatureMatriceTab";
import CandidatureGEDTab from "./pages/admin/CandidatureGEDTab";
import CollectFlow from "./pages/collect/CollectFlow";

import ConfigError from "./components/common/ConfigError";

const queryClient = new QueryClient();

const App = () => {
  const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'VOTRE_URL_SUPABASE';

  if (!isConfigured) {
    return <ConfigError />;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Public Collect Portal — no admin auth required */}
            <Route path="/collect/:token" element={<CollectFlow />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="candidatures" element={<Applications />} />

              {/* Candidature sub-pages with tab layout */}
              <Route path="candidatures/:id" element={<CandidatureLayout />}>
                <Route index element={<Navigate to="dossier" replace />} />
                <Route path="dossier" element={<CandidatureDossierTab />} />
                <Route path="matrice" element={<CandidatureMatriceTab />} />
                <Route path="ged" element={<CandidatureGEDTab />} />
              </Route>

              <Route path="bourses" element={<Scholarships />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
