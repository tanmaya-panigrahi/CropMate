import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import DashboardLayout from "@/layouts/DashboardLayout";

import Overview from "@/pages/dashboard/Overview";
import Diagnose from "@/pages/dashboard/Diagnose";
import History from "@/pages/dashboard/History";
import Crops from "@/pages/dashboard/Crops";
import ChatBot from "@/pages/dashboard/ChatBot";
import Profile from "@/pages/dashboard/Profile";
import About from "@/pages/dashboard/About";
import PlantDiseaseDetector from "./pages/dashboard/PlantDiseaseDetector";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />

        {/* Dashboard Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />

          {/* Dashboard Pages */}
          <Route path="overview" element={<Overview />} />
          <Route path="diagnose" element={<Diagnose />} />
          <Route path="history" element={<History />} />
          <Route path="crops" element={<Crops />} />
          <Route path="chatbot" element={<ChatBot />} />
          <Route path="plant-disease-detector" element={<PlantDiseaseDetector />} />

          {/* Topbar Dropdown Pages */}
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
