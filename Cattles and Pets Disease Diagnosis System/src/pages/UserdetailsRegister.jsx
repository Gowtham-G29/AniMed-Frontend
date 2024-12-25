import { useState } from "react";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";
import { userDetailsRegister } from "../services/api";
import { useNavigate } from "react-router-dom";

function UserDetailsRegister() {
  const initialState = {
    Name: { required: false },
    contactNumber: { required: false },
    contactEmail: { required: false, invalid: false },
    Address: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    Name: "",
    contactNumber: "",
    telephoneNumber: "",
    contactEmail: "",
    Address: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validationErrors = { ...initialState };
    let hasError = false;

    // Validate required fields
    if (!inputs.Name) {
      validationErrors.Name.required = true;
      hasError = true;
    }
    if (!inputs.contactNumber) {
      validationErrors.contactNumber.required = true;
      hasError = true;
    }
    if (!inputs.contactEmail) {
      validationErrors.contactEmail.required = true;
      hasError = true;
    } else if (!validateEmail(inputs.contactEmail)) {
      validationErrors.contactEmail.invalid = true;
      hasError = true;
    }
    if (!inputs.Address) {
      validationErrors.Address.required = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await userDetailsRegister({
        Name: inputs.Name,
        contactNumber: inputs.contactNumber,
        telephoneNumber: inputs.telephoneNumber,
        contactEmail: inputs.contactEmail,
        Address: inputs.Address,
      });
      console.log(response);

      if (response.data.token) {
        setLoading(false);
        navigate("/doctordashboard");
      }

    } catch (error) {
      console.log(error)
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
        <section className="py-20 bg-hero-pattern min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl bg-slate-200 p-8 shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold mb-6">
                  Register Animal Owner
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="Name"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.Name.required && (
                      <span className="text-red-500 text-sm">
                        Name is required.
                      </span>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.contactNumber.required && (
                      <span className="text-red-500 text-sm">
                        Contact Number is required.
                      </span>
                    )}
                  </div>

                  {/* Telephone Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Telephone Number
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      placeholder="Optional"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.contactEmail.required && (
                      <span className="text-red-500 text-sm">
                        Email is required.
                      </span>
                    )}
                    {errors.contactEmail.invalid && (
                      <span className="text-red-500 text-sm">
                        Enter a valid email.
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  
                  <div>
                    <label className="block text-gray-700 font-semibold">
                      Address
                    </label>
                    <textarea
                      name="Address"
                      onChange={handleInput}
                      className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    {errors.Address.required && (
                      <span className="text-red-500 text-sm">
                        Address is required.
                      </span>
                    )}
                  </div>

                  <div className="col-span-2">
                    {errors.custom_error && (
                      <div className="text-red-500 text-center">
                        <p>{errors.custom_error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded mt-4"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
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

export default UserDetailsRegister;
