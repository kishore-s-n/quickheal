import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DoctorAuth from "./pages/doctor/auth/page";
import DoctorDashboard from "./pages/doctor/dashboard/page";
import PatientAuth from "./pages/patient/auth/page";
import PatientDashboard from "./pages/patient/dashboard/page";
import Meet from "./pages/Meet";
import AdminPage from "./pages/admin/page";
import AdminAuth from "./pages/admin/auth/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/auth" element={<AdminAuth />} />

        <Route path="/auth/doctor" element={<DoctorAuth />} />
        <Route path="/auth/patient" element={<PatientAuth />} />

        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/Patient" element={<PatientDashboard />} />

        <Route path="/meet" element={<Meet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
