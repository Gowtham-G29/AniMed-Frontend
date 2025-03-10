import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";
import { accountDeactivate, vetDoctorDetailsRegister } from "../services/api";
import Loader from "../components/Loader";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import LocationSelectionModeConfirmationModal from "../components/LocationSelectionConfirmationModal";
import ManualSelectMapModal from "../components/ManualSelectMapModal";

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

  const statesAndDistricts = {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Tirupati",
      "Guntur",
      "Nellore",
      "Kakinada",
      "Rajahmundry",
      "Anantapur",
      "Chittoor",
      "Krishna",
      "East Godavari",
      "West Godavari",
      "Kadapa",
      "Srikakulam",
      "Vizianagaram",
      "Prakasam",
      "Kurnool",
      "Palnadu",
    ],
    "Arunachal Pradesh": [
      "Itanagar",
      "Tawang",
      "Naharlagun",
      "Ziro",
      "Aalo",
      "Bomdila",
      "Tezu",
      "Changlang",
      "Pasighat",
      "Roing",
    ],
    Assam: [
      "Guwahati",
      "Dibrugarh",
      "Silchar",
      "Jorhat",
      "Nagaon",
      "Tinsukia",
      "Bongaigaon",
      "Barpeta",
      "Tezpur",
      "Haflong",
      "Darrang",
      "Sivasagar",
      "Sonitpur",
      "Karimganj",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Muzaffarpur",
      "Bhagalpur",
      "Munger",
      "Darbhanga",
      "Purnia",
      "Saharsa",
      "Chhapra",
      "Begusarai",
      "Sitamarhi",
      "Samastipur",
      "Kishanganj",
      "Vaishali",
    ],
    Chhattisgarh: [
      "Raipur",
      "Bilaspur",
      "Korba",
      "Durg",
      "Rajnandgaon",
      "Jagdalpur",
      "Raigarh",
      "Kabirdham",
      "Surguja",
      "Janjgir-Champa",
    ],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Anand",
      "Narmada",
      "Kutch",
      "Mehsana",
      "Gandhinagar",
      "Kheda",
      "Porbandar",
    ],
    Haryana: [
      "Chandigarh",
      "Faridabad",
      "Gurugram",
      "Karnal",
      "Ambala",
      "Hisar",
      "Rohtak",
      "Sonipat",
      "Panipat",
      "Yamunanagar",
      "Bhiwani",
      "Rewari",
      "Mahendragarh",
    ],
    "Himachal Pradesh": [
      "Shimla",
      "Manali",
      "Kullu",
      "Kangra",
      "Solan",
      "Mandi",
      "Chamba",
      "Bilaspur",
      "Una",
      "Hamirpur",
    ],
    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Hazaribagh",
      "Bokaro",
      "Giridih",
      "Deoghar",
      "Dumka",
      "Palamu",
      "Latehar",
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubli",
      "Dharwad",
      "Belagavi",
      "Tumakuru",
      "Davangere",
      "Ballari",
      "Udupi",
      "Chitradurga",
      "Kodagu",
      "Bagalkot",
      "Bijapur",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kottayam",
      "Alappuzha",
      "Thrissur",
      "Palakkad",
      "Ernakulam",
      "Malappuram",
      "Wayanad",
      "Idukki",
      "Kannur",
      "Kasargod",
    ],
    "Madhya Pradesh": [
      "Bhopal",
      "Indore",
      "Gwalior",
      "Jabalpur",
      "Ujjain",
      "Sagar",
      "Satna",
      "Khandwa",
      "Dewas",
      "Shivpuri",
      "Chhindwara",
      "Ratlam",
      "Khargone",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Thane",
      "Aurangabad",
      "Kolhapur",
      "Solapur",
      "Satara",
      "Amravati",
      "Nagpur",
      "Palghar",
      "Chandrapur",
      "Jalgaon",
    ],
    Manipur: [
      "Imphal",
      "Thoubal",
      "Churachandpur",
      "Bishnupur",
      "Kakching",
      "Senapati",
      "Ukhrul",
    ],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Williamnagar", "Nongpoh"],
    Mizoram: ["Aizawl", "Champhai", "Lunglei", "Kolasib", "Serchhip", "Mamit"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto", "Mon"],
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Berhampur",
      "Sambalpur",
      "Balasore",
      "Puri",
      "Angul",
      "Kendrapara",
      "Kalahandi",
      "Bargarh",
    ],
    Punjab: [
      "Chandigarh",
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Mohali",
      "Hoshiarpur",
      "Kapurthala",
      "Firozpur",
    ],
    Rajasthan: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Alwar",
      "Sikar",
      "Pali",
      "Churu",
    ],
    Sikkim: ["Gangtok", "Namchi", "Mangan", "Rangpo"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Tirunelveli",
      "Tiruchirappalli",
      "Vellore",
      "Erode",
      "Thanjavur",
      "Ramanathapuram",
      "Karur",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Khammam",
      "Nalgonda",
      "Karimnagar",
      "Nizamabad",
      "Mahabubnagar",
      "Adilabad",
      "Medak",
    ],
    Tripura: ["Agartala", "Udaipur", "Ambassa", "Dharmanagar", "Belonia"],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Allahabad",
      "Ghaziabad",
      "Meerut",
      "Noida",
      "Mathura",
      "Firozabad",
      "Aligarh",
      "Bareilly",
    ],
    Uttarakhand: [
      "Dehradun",
      "Nainital",
      "Haridwar",
      "Roorkee",
      "Almora",
      "Haldwani",
      "Udham Singh Nagar",
      "Tehri Garhwal",
      "Pithoragarh",
    ],
    "West Bengal": [
      "Kolkata",
      "Siliguri",
      "Howrah",
      "Durgapur",
      "Asansol",
      "Murshidabad",
      "Malda",
      "Jalpaiguri",
      "Birbhum",
      "Hooghly",
    ],
    "Andaman and Nicobar Islands": [
      "Port Blair",
      "Car Nicobar",
      "Mayabunder",
      "Havelock",
      "Diglipur",
    ],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
    Delhi: [
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
      "West Delhi",
      "Central Delhi",
    ],
    Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    Ladakh: ["Leh", "Kargil"],

    "Jammu and Kashmir": [
      "Srinagar",
      "Jammu",
      "Baramulla",
      "Anantnag",
      "Pulwama",
      "Kupwara",
      "Kathua",
      "Udhampur",
      "Rajouri",
      "Poonch",
    ],
  };

  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [manualCoords, setManualCoords] = useState(null);
  const [openManualSelectLocation, setOpenManualSelectLocation] =
    useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
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
    state: "",
    district: "",
    pincode: "",
    country: "India", // Default country
    geolocation: { latitude: "", longitude: "" },
  });

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInputs((prevInputs) => ({
            ...prevInputs,
            geolocation: {
              latitude: String(latitude),
              longitude: String(longitude),
            },
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (manualCoords?.lat && manualCoords?.lng) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        geolocation: {
          latitude: String(manualCoords.lat),
          longitude: String(manualCoords.lng),
        },
      }));
    }
  }, [manualCoords]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLocationModal(true);
  };

  const handleLocationChoice = (manual) => {
    setShowLocationModal(false);
    if (manual) {
      setOpenManualSelectLocation(true);
    } else {
      location();
    }
  };

  useEffect(() => {
    if (
      inputs.geolocation.latitude &&
      inputs.geolocation.longitude &&
      !showLocationModal
    ) {
      submitForm();
    }
  }, [inputs.geolocation]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitForm = async () => {
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

    if (!inputs.state) {
      validationErrors.state.required = true;
      hasError = true;
    }
    if (!inputs.district) {
      validationErrors.district.required = true;
      hasError = true;
    }
    if (!inputs.pincode) {
      validationErrors.pincode.required = true;
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
        state: inputs.state,
        district: inputs.district,
        pincode: inputs.pincode,
        country: inputs.country,
        latitude: inputs.geolocation.latitude,
        longitude: inputs.geolocation.longitude,
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
        {showLocationModal && (
          <LocationSelectionModeConfirmationModal
            handleLocationChoice={handleLocationChoice}
          />
        )}

        {openManualSelectLocation && (
          <ManualSelectMapModal
            setManualCoords={setManualCoords}
            setOpenManualSelectLocation={setOpenManualSelectLocation}
          />
        )}
        {!loading ? (
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
                      <TextField
                        label="Full Name"
                        name="fullName"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.fullName.required)}
                        helperText={
                          errors.fullName.required && "Full Name is required."
                        }
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(
                          errors.email.required || errors.email.invalid
                        )}
                        helperText={
                          errors.email.required
                            ? "Email is required."
                            : errors.email.invalid
                              ? "Enter a valid email."
                              : ""
                        }
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.phoneNumber.required)}
                        helperText={
                          errors.phoneNumber.required &&
                          "Phone Number is required."
                        }
                      />
                    </div>

                    {/* License Number */}
                    <div>
                      <TextField
                        label="License Number"
                        name="licenseNumber"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.licenseNumber.required)}
                        helperText={
                          errors.licenseNumber.required &&
                          "License Number is required."
                        }
                      />
                    </div>

                    {/* Specialization */}
                    <div>
                      <TextField
                        label="Specialization"
                        name="specialization"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.specialization.required)}
                        helperText={
                          errors.specialization.required &&
                          "Specialization is required."
                        }
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <TextField
                        label="Years of Experience"
                        name="experience"
                        type="number"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.experience.required)}
                        helperText={
                          errors.experience.required &&
                          "Experience is required."
                        }
                      />
                    </div>

                    {/* Clinic Name */}
                    <div>
                      <TextField
                        label="Clinic Name (Optional)"
                        name="clinicName"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                      />
                    </div>

                    {/* Clinic Address */}
                    <div>
                      <TextField
                        label="Clinic Address (Optional)"
                        name="clinicAddress"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </div>

                    {/* State */}
                    <div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>State</InputLabel>
                        <Select
                          label="State"
                          name="state"
                          onChange={handleInput}
                          value={inputs.state || ""}
                          error={Boolean(errors.state && errors.state.required)}
                        >
                          <MenuItem value="">Select a state</MenuItem>
                          {Object.keys(statesAndDistricts).map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.state && errors.state.required && (
                          <span className="text-red-500 text-sm">
                            State is required.
                          </span>
                        )}
                      </FormControl>
                    </div>

                    {/* District */}
                    <div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>District</InputLabel>
                        <Select
                          label="District"
                          name="district"
                          onChange={handleInput}
                          value={inputs.district || ""}
                          disabled={!inputs.state}
                          error={Boolean(
                            errors.district && errors.district.required
                          )}
                        >
                          <MenuItem value="">Select a district</MenuItem>
                          {inputs.state &&
                            statesAndDistricts[inputs.state]?.map(
                              (district) => (
                                <MenuItem key={district} value={district}>
                                  {district}
                                </MenuItem>
                              )
                            )}
                        </Select>
                        {errors.district && errors.district.required && (
                          <span className="text-red-500 text-sm">
                            District is required.
                          </span>
                        )}
                      </FormControl>
                    </div>

                    {/* Pincode */}
                    <div>
                      <TextField
                        label="Pincode"
                        name="pincode"
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        error={Boolean(
                          errors.pincode && errors.pincode.required
                        )}
                        helperText={
                          errors.pincode &&
                          errors.pincode.required &&
                          "Pincode is required."
                        }
                      />
                    </div>

                    {/* Preferred Language */}
                    <div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Preferred Language</InputLabel>
                        <Select
                          label="Preferred Language"
                          name="preferredLanguage"
                          onChange={handleInput}
                          value={inputs.preferredLanguage}
                        >
                          <MenuItem value="English">English</MenuItem>
                          <MenuItem value="Tamil">Tamil</MenuItem>
                          <MenuItem value="Hindi">Hindi</MenuItem>
                          <MenuItem value="Telugu">Telugu</MenuItem>
                          <MenuItem value="Malayalam">Malayalam</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Register"}
                      </Button>
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
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default VetDoctorDetailsRegister;
