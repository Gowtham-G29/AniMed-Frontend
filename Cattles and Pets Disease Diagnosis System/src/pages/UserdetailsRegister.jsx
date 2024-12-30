import { useState } from "react";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";
import { userDetailsRegister } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function UserDetailsRegister() {
  const initialState = {
    Name: { required: false },
    contactNumber: { required: false },
    contactEmail: { required: false, invalid: false },
    Address: { required: false },
    State: { required: false },
    District: { required: false },
    Pincode: { required: false },
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
    State: "",
    District: "",
    Pincode: "",
    Country: "India", // Default country
  });

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const navigate = useNavigate();

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
    if (!inputs.State) {
      validationErrors.State.required = true;
      hasError = true;
    }
    if (!inputs.District) {
      validationErrors.District.required = true;
      hasError = true;
    }
    if (!inputs.Pincode) {
      validationErrors.Pincode.required = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await userDetailsRegister({
        ...inputs,
      });

      if (response.data.token) {
        setLoading(false);
        navigate("/userdashboard");
      }
    } catch (error) {
      console.log(error);
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
        {!loading ? (
        <section className="py-20 bg-hero-pattern min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-slate-200 p-8 shadow-md rounded-lg">
              <h2 className="text-center text-2xl font-bold mb-6">
                Register Animal Owner
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                
                {/* Name */}
                <div>
                  <TextField
                    label="Name"
                    name="Name"
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.Name?.required)}
                    helperText={errors.Name?.required && 'Name is required.'}
                  />
                </div>
      
                {/* Contact Number */}
                <div>
                  <TextField
                    label="Contact Number"
                    name="contactNumber"
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.contactNumber?.required)}
                    helperText={errors.contactNumber?.required && 'Contact Number is required.'}
                  />
                </div>
      
                {/* Contact Email */}
                <div>
                  <TextField
                    label="Contact Email"
                    type="email"
                    name="contactEmail"
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.contactEmail?.required || errors.contactEmail?.invalid)}
                    helperText={
                      errors.contactEmail?.required
                        ? 'Email is required.'
                        : errors.contactEmail?.invalid
                        ? 'Invalid email format.'
                        : ''
                    }
                  />
                </div>
      
                {/* Address */}
                <div>
                  <TextField
                    label="Address"
                    name="Address"
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.Address?.required)}
                    helperText={errors.Address?.required && 'Address is required.'}
                  />
                </div>
      
                {/* State */}
                <div>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>State</InputLabel>
                    <Select
                      label="State"
                      name="State"
                      onChange={handleInput}
                      value={inputs.State}
                      error={Boolean(errors.State?.required)}
                    >
                      <MenuItem value="">Select a state</MenuItem>
                      {Object.keys(statesAndDistricts).map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.State?.required && (
                      <span className="text-red-500 text-sm">State is required.</span>
                    )}
                  </FormControl>
                </div>
      
                {/* District */}
                <div>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>District</InputLabel>
                    <Select
                      label="District"
                      name="District"
                      onChange={handleInput}
                      value={inputs.District}
                      disabled={!inputs.State}
                      error={Boolean(errors.District?.required)}
                    >
                      <MenuItem value="">Select a district</MenuItem>
                      {inputs.State &&
                        statesAndDistricts[inputs.State]?.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.District?.required && (
                      <span className="text-red-500 text-sm">District is required.</span>
                    )}
                  </FormControl>
                </div>
      
                {/* Pincode */}
                <div>
                  <TextField
                    label="Pincode"
                    name="Pincode"
                    onChange={handleInput}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.Pincode?.required)}
                    helperText={errors.Pincode?.required && 'Pincode is required.'}
                  />
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
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
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

export default UserDetailsRegister;
