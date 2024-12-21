import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landpage from "./pages/Landpage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ForgotPass from "./components/ForgotPass";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgotPassword" element={<ForgotPass/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}
