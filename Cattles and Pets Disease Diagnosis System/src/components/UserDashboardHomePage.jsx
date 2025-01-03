/* eslint-disable react/prop-types */
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { AnimatedName } from "./AnimatedName";
import { useEffect } from "react";
import { getAnimalOwnerDetails } from "../services/api";
import { useState } from "react";
function UserDashboardHomePage({ setregPageNavigate }) {
  const [userName, setuserName] = useState(null);

  const handleNavigateRegPage = () => {
    setregPageNavigate(true);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getAnimalOwnerDetails();
        const name = user.data.AnimalOwner.Name;
        const firstName = name.split(" ")[0]; 
        setuserName(firstName); 
      } catch (error) {
        return error;
      }
    };
    fetchUserName();
  });

  return (
    <div
      className="hero min-h-screen"
      style={{
        minHeight:'82vh',
        backgroundImage:
          "url(https://i.pinimg.com/736x/8e/73/77/8e73771f779f6303631c970586b0844b.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <div className="flex mb-5 px-3 text-5xl font-bold">
          <AnimatedName
              text={`Hello`}
              className="custom-class mr-3"
              delay={50}
            />            <AnimatedName
              text={`${userName} !`}
              className="custom-class"
              delay={50}
            />
          </div>

      
          <button className="btn bg-blue-400" onClick={handleNavigateRegPage}>
            Get Consult <MedicalServicesIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardHomePage;
