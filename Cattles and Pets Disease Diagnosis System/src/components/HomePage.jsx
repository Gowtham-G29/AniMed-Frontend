import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmojiNatureSharpIcon from "@mui/icons-material/EmojiNatureSharp";
import NavBarMobile from "./NavBarMobile";
import NavBar from "./NavBar";
import Home from "../assets/Home.webp";
import { Link } from "react-router-dom";
import { AnimatedName } from "./AnimatedName";
import { autoLogin, getUserState } from "../services/api";
import { useState } from "react";
import Loader from "./Loader";

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const handleAutoLogin = async (token) => {
      try {
        setLoading(true);
        const response = await autoLogin(token);
        const userState = await getUserState(response.data.user.id);
        const Role = userState.data.userState.role;
        const isActivate = userState.data.userState.activate;
        setLoading(false);

        if (isActivate) {
          if (Role === "veternarian") {
            navigate("/doctorDashboard");
          } else if (Role === "user") {
            navigate("/userDashboard");
          } else if (Role === "approveAdmin") {
            navigate("/approvePanel");
          }
        } else {
          navigate('/404Error');
        }
      } catch (error) {
        console.error("Auto-login failed:", error);
        localStorage.removeItem("jwt");
      }
    };

    if (token) {
      handleAutoLogin(token);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {" "}
      <div>
        <div className="block sm:hidden">
          <NavBarMobile />
        </div>
        <div className="hidden sm:block">
          <NavBar />
        </div>

        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${Home})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                <AnimatedName
                  text="AniMed"
                  className="custom-class"
                  delay={50}
                />
              </h1>
              <p className="mb-5">
                &quot;Compassion for Every Paw and Hoof – Caring Beyond
                Boundaries!&quot;
              </p>
              <Link to="/register">
                <button className="btn btn-primary">
                  <div className="flex">
                    <EmojiNatureSharpIcon fontSize="medium" />
                  </div>
                  Diagnos Your Favourites
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
