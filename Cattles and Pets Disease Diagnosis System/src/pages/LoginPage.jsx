import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import { useNavigate } from "react-router-dom";
import Home from "../assets/Home.webp";
import { login } from "../services/api";
import { Button, CircularProgress, TextField } from "@mui/material";
// import OAuthSignInPage from "../components/OauthComponent";

function LoginPage() {
  const initialState = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors before validation
    let validationErrors = { ...initialState };
    let hasError = false;

    // Validate inputs
    if (!inputs.email) {
      validationErrors.email.required = true;
      hasError = true;
    }
    if (!inputs.password) {
      validationErrors.password.required = true;
      hasError = true;
    }

    // Set errors if validation fails
    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await login({
        email: inputs.email,
        password: inputs.password,
      });
      setLoading(false);

      if (response.data.token&&response.data.user.detailsRegStatus===true&&response.data.user.role==='user') {
        localStorage.clear();
        localStorage.setItem("jwt", response.data.token);
        navigate("/userDashboard");
      }
      
      if(response.data.token&&response.data.user.detailsRegStatus===false&&response.data.user.role==='user'){
        localStorage.clear();
        localStorage.setItem("jwt", response.data.token);
        navigate('/userDetailsRegister')
      }

      if (response.data.token&&response.data.user.detailsRegStatus===true&&response.data.user.role==='veternarian') {
        localStorage.clear();
        localStorage.setItem("jwt", response.data.token);
        navigate("/doctorDashboard");
      }
      
      if(response.data.token&&response.data.user.detailsRegStatus===false&&response.data.user.role==='veternarian'){
        localStorage.clear();
        localStorage.setItem("jwt", response.data.token);
        navigate('/vetDoctorDetailsRegister')
      }

    } catch (err) {
      setLoading(false);
      console.log(err);
      const serverError = err.response?.data?.message || "An unexpected error occurred.";
      let customError = null;

      if (serverError === "Invalid password") {
        customError = "Invalid password.";
      } else if (serverError === "User Not Found") {
        customError = "Invalid Email! User Not Found.";
      } else {
        customError = "An error occurred. Please try again.";
      }

      setErrors({
        ...validationErrors,
        custom_error: customError,
      });
    }
  };

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <NavBar2 />
      <div
        style={{
          backgroundImage: `url(${Home})`,
        }}
      >
     <section className="min-h-screen flex items-center justify-center bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-slate-200 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login Now</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="mb-4">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={inputs.email}
                  onChange={handleInput}
                  disabled={loading}
                  error={!!errors.email.required}
                  helperText={errors.email.required ? 'Email is required.' : ''}
                />
              </div>

              <div className="mb-4">
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleInput}
                  disabled={loading}
                  error={!!errors.password.required}
                  helperText={errors.password.required ? 'Password is required.' : ''}
                />
                <div className="mt-2 text-right">
                  <Link to="/forgotPassword" className="text-blue-500 text-sm">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="mb-4">
                {loading && (
                  <div className="text-center my-4">
                    <CircularProgress />
                  </div>
                )}
                {errors.custom_error && (
                  <div className="text-red-500 text-center">
                    <p>{errors.custom_error}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  className="mt-4"
                >
                  Login
                </Button>
              </div>

              <div className="text-center mt-4">
                <p>
                  Create a new account? Please{' '}
                  <Link to="/register" className="text-blue-500">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
