import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/HomePage";
import PeoplesPage from "./pages/PeoplesPage";
import PeopleDetailPage from "./pages/PeopleDetailPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import LessonPage from "./pages/LessonPage";
import AtlasPage from "./pages/AtlasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/peoples" element={<PeoplesPage />} />
            <Route path="/peoples/:id" element={<PeopleDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/atlas/:id" element={<PeopleDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/lesson" element={<LessonPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;