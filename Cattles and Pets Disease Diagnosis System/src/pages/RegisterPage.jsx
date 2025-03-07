import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";
import { accountDeactivate, signup } from "../services/api";
import { Button, CircularProgress, TextField } from "@mui/material";

function Register() {
  const initialState = {
    email: { required: false, invalid: false },
    password: { required: false, weak: false },
    passwordConfirm: { required: false, mismatch: false },
    name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePasswordStrength = (password) => password.length >= 6;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors before validation
    let validationErrors = { ...initialState };
    let hasError = false;

    // Validate inputs
    if (!inputs.name) {
      validationErrors.name.required = true;
      hasError = true;
    }
    if (!inputs.email) {
      validationErrors.email.required = true;
      hasError = true;
    } else if (!validateEmail(inputs.email)) {
      validationErrors.email.invalid = true;
      hasError = true;
    }
    if (!inputs.password) {
      validationErrors.password.required = true;
      hasError = true;
    } else if (!validatePasswordStrength(inputs.password)) {
      validationErrors.password.weak = true;
      hasError = true;
    }
    if (!inputs.passwordConfirm) {
      validationErrors.passwordConfirm.required = true;
      hasError = true;
    } else if (inputs.password !== inputs.passwordConfirm) {
      validationErrors.passwordConfirm.mismatch = true;
      hasError = true;
    }

    // If validation fails, set errors and stop submission
    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with registration if no errors
    setLoading(true);

    try {
      const response = await signup({
        name: inputs.name,
        email: inputs.email,
        role: inputs.role,
        password: inputs.password,
        passwordConfirm: inputs.passwordConfirm,
      });

      if (response.data.token && response.data.newUser.role === "veternarian") {
        setLoading(false);
        navigate("/vetDoctorDetailsRegister");
      }
      if (response.data.token && response.data.newUser.role === "user") {
        setLoading(false);
        navigate("/userDetailsRegister");
      }

      try{
        if (response.data.token && response.data.newUser.role === "approveAdmin") {
          setLoading(true);
          accountDeactivate();
          setLoading(false);
          navigate("/404Error");
        }
      }catch(error){
        console.log(error);
      }
     

    } catch (err) {
      setLoading(false);
      console.log(err);
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
        <section className="register-block py-20 bg-hero-pattern min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-lg bg-slate-200 p-8 shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold mb-6">
                  Register Now
                </h2>
                <form onSubmit={handleSubmit} className="register-form">
                  <div className="form-group mb-4">
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      name="name"
                      id="name"
                      onChange={handleInput}
                      disabled={loading}
                      error={!!errors.name.required}
                      helperText={
                        errors.name.required ? "Name is required." : ""
                      }
                    />
                  </div>

                  <div className="form-group mb-4">
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInput}
                      disabled={loading}
                      error={!!errors.email.required || !!errors.email.invalid}
                      helperText={
                        errors.email.required
                          ? "Email is required."
                          : errors.email.invalid
                            ? "Enter a valid email address."
                            : ""
                      }
                    />
                  </div>

                  <div className="form-group mb-4">
                    <TextField
                      label="Identity"
                      variant="outlined"
                      fullWidth
                      select
                      name="role"
                      value={inputs.role}
                      onChange={handleInput}
                      disabled={loading}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="user">User</option>
                      <option value="veternarian">Veternarian</option>
                      <option value="approveAdmin">Admin</option>

                    </TextField>
                  </div>

                  <div className="form-group mb-4">
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleInput}
                      disabled={loading}
                      error={
                        !!errors.password.required || !!errors.password.weak
                      }
                      helperText={
                        errors.password.required
                          ? "Password is required."
                          : errors.password.weak
                            ? "Password should be at least 6 characters."
                            : ""
                      }
                    />
                  </div>

                  <div className="form-group mb-4">
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="passwordConfirm"
                      id="passwordConfirm"
                      onChange={handleInput}
                      disabled={loading}
                      error={
                        !!errors.passwordConfirm.required ||
                        !!errors.passwordConfirm.mismatch
                      }
                      helperText={
                        errors.passwordConfirm.required
                          ? "Confirm Password is required."
                          : errors.passwordConfirm.mismatch
                            ? "Passwords do not match."
                            : ""
                      }
                    />
                  </div>

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
                    Register
                  </Button>

                  <div className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                      Login
                    </Link>
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

export default Register;
