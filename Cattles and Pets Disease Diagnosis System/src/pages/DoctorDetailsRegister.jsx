import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";
import { accountDeactivate, vetDoctorDetailsRegister } from "../services/api";

function VetDoctorDetailsRegister() {
  const navigate = useNavigate();

  const initialState = {
    fullName: { required: false },
    email: { required: false, invalid: false },
    phoneNumber: { required: false },
    licenseNumber: { required: false },
    specialization: { required: false },
    experience: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
    preferredLanguage: "English",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validationErrors = { ...initialState };
    let hasError = false;

    // Validate required fields
    if (!inputs.fullName) {
      validationErrors.fullName.required = true;
      hasError = true;
    }
    if (!inputs.email) {
      validationErrors.email.required = true;
      hasError = true;
    } else if (!validateEmail(inputs.email)) {
      validationErrors.email.invalid = true;
      hasError = true;
    }
    if (!inputs.phoneNumber) {
      validationErrors.phoneNumber.required = true;
      hasError = true;
    }
    if (!inputs.licenseNumber) {
      validationErrors.licenseNumber.required = true;
      hasError = true;
    }
    if (!inputs.specialization) {
      validationErrors.specialization.required = true;
      hasError = true;
    }
    if (!inputs.experience) {
      validationErrors.experience.required = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: inputs.fullName,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        licenseNumber: inputs.licenseNumber,
        specialization: inputs.specialization,
        experience: inputs.experience,
        clinicName: inputs.clinicName,
        clinicAddress: inputs.clinicAddress,
        preferredLanguage: inputs.preferredLanguage,
      };

      const response = await vetDoctorDetailsRegister(payload);

      if (response.data.token) {
        setLoading(false);
        navigate("/regSuccessPage");
        accountDeactivate();
      }
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
      <NavBar2 />
      <div
        style={{
          backgroundImage: `url(${Home})`,
        }}
      >
        <section className="py-20 bg-hero-pattern min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl bg-slate-200 p-8 shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold mb-6">
                  Register Veterinarian Doctor
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.fullName.required && (
                      <span className="text-red-500 text-sm">
                        Full Name is required.
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.email.required && (
                      <span className="text-red-500 text-sm">
                        Email is required.
                      </span>
                    )}
                    {errors.email.invalid && (
                      <span className="text-red-500 text-sm">
                        Enter a valid email.
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.phoneNumber.required && (
                      <span className="text-red-500 text-sm">
                        Phone Number is required.
                      </span>
                    )}
                  </div>

                  {/* License Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.licenseNumber.required && (
                      <span className="text-red-500 text-sm">
                        License Number is required.
                      </span>
                    )}
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.specialization.required && (
                      <span className="text-red-500 text-sm">
                        Specialization is required.
                      </span>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.experience.required && (
                      <span className="text-red-500 text-sm">
                        Experience is required.
                      </span>
                    )}
                  </div>

                  {/* Clinic Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Clinic Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="clinicName"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>

                  {/* Clinic Address */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Clinic Address (Optional)
                    </label>
                    <textarea
                      name="clinicAddress"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    ></textarea>
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Preferred Language
                    </label>
                    <select
                      name="preferredLanguage"
                      onChange={handleInput}
                      value={inputs.preferredLanguage}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    >
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">Malayalam</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-2 text-center">
                    <button
                      type="submit"
                      className={`btn w-full bg-blue-500 text-white py-2 rounded ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Register"}
                    </button>
                  </div>
                </form>

                {/* Error Message */}
                {errors.custom_error && (
                  <div className="text-center text-red-500 mt-4">
                    {errors.custom_error}
                  </div>
                )}

                {/* Login Link */}
                <div className="mt-6 text-center">
                  Already registered?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default VetDoctorDetailsRegister;
