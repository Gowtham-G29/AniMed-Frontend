import { useEffect, useState } from "react";
import { AnimatedName } from "./AnimatedName";
import { useNavigate } from "react-router-dom";
import { getDoctorDetails } from "../services/api";

function DoctorDashboardHomePage() {
  const [userName, setuserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getDoctorDetails();
        console.log(user);
        const name = user.data.doctor.fullName;
        const firstName = name.split(" ")[0];
        setuserName(firstName);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userName) {
        navigate("/404Error");
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [userName, navigate]);

  return (
    <div
      className="hero min-h-screen"
      style={{
        minHeight: "82vh",
        backgroundImage: "url(https://wallpapercave.com/wp/wp14189973.jpg)",
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
            />{" "}
            <AnimatedName text={`Dr.${userName}`} className="custom-class" delay={50} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboardHomePage;
