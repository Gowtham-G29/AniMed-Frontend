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
        backgroundImage:
          "url(https://i.pinimg.com/474x/b9/3a/b0/b93ab0864404db012d1578d59ae3dee4.jpg)",
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
