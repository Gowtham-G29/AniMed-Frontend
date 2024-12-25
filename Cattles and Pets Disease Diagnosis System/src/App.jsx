import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landpage from "./pages/Landpage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPass";
import UserDetailsRegister from "./pages/UserdetailsRegister";
import VetDoctorDetailsRegister from "./pages/DoctorDetailsRegister";
import RegSuccessPage from "./pages/RegSuccessPage";
import AnimalDetailsRegister from "./pages/AnimalDetailsRegister";
import DashboardLayoutBasic from "./pages/DoctorDashboard";
import DashboardLayoutNavigationActions from "./pages/UserDashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgotPassword" element={<ForgotPass/>}/>
          <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
          <Route path="/userDetailsRegister" element={<UserDetailsRegister/>}/>
          <Route path="/vetDoctorDetailsRegister" element={<VetDoctorDetailsRegister/>}/>
          <Route path="/regSuccessPage" element={<RegSuccessPage/>}/>
          <Route path="/animalRegister" element={<AnimalDetailsRegister/>}/>
          <Route path="/doctorDashboard" element={<DashboardLayoutBasic/>}/>
          <Route path='/userDashboard' element={<DashboardLayoutNavigationActions/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
