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
import AnimalImageList from "./components/AnimalImageListPet";
import Loader from "./components/Loader";
import AnimalRegFailSnackBar from "./components/AnimalRegFailSnackBar";
import AnimalRegSuccesPage from "./components/AnimalRegSuccesPage";
import Avatar from "./components/Avatar";
import UserAccountOverview from "./pages/UserDetails";
import ErrorPage from "./components/ErrorPage";
import LogoutModel from "./components/LogoutModel";
import AnimalDataTable from "./components/DataTableAnimal";
import SuggestionModel from "./components/SuggestionModel";
import {  UserMap } from "./pages/UserMap";
import DoctorContacts from "./components/DoctorContacts";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route
            path="/userDetailsRegister"
            element={<UserDetailsRegister />}
          />
          <Route
            path="/vetDoctorDetailsRegister"
            element={<VetDoctorDetailsRegister />}
          />
          <Route path="/regSuccessPage" element={<RegSuccessPage />} />
          <Route path="/animalRegister" element={<AnimalDetailsRegister />} />
          <Route path="/doctorDashboard" element={<DashboardLayoutBasic />} />
          <Route
            path="/userDashboard"
            element={<DashboardLayoutNavigationActions />}
          />
          <Route path="/animalList" element={<AnimalImageList />} />
          <Route path='/animalRegFailSnackbar' element={<AnimalRegFailSnackBar/>}/>
          <Route path="/loader" element={<Loader/>}/>
          <Route path="/successpage" element={<AnimalRegSuccesPage/>}/>
          <Route path="/avatar" element={<Avatar/>}/>
          <Route path="/details" element={<UserAccountOverview/>}/>
          <Route path="/404Error" element={<ErrorPage/>}/>
          <Route path="/logout" element={<LogoutModel/>}/>
          <Route path="/dataTable" element={<AnimalDataTable/>}/>
          <Route path="/suggestion" element={<SuggestionModel/>}/>
          <Route path="/map" element={<UserMap/>}/>
          <Route path="/contacts" element={<DoctorContacts/>}/>         
        </Routes>
      </BrowserRouter>
    </>
  );
}
