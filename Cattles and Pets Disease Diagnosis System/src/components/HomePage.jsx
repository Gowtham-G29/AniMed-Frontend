import EmojiNatureSharpIcon from "@mui/icons-material/EmojiNatureSharp";
import NavBarMobile from "./NavBarMobile";
import NavBar from "./NavBar";
import Home from "../assets/Home.webp"
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <div className="block sm:hidden">
        <NavBarMobile />
      </div>
      <div className="hidden sm:block">
        <NavBar />
      </div>

      <div
        className="hero min-h-screen "
        style={{
          backgroundImage:
            `url(${Home})`,
        }}

      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">ANI MED</h1>
            <p className="mb-5">
              &quot;Compassion for Every Paw and Hoof – Caring Beyond
              Boundaries!&quot;
            </p>
            <Link to="/register">
            <button className="btn btn-primary">
              <div className="flex ">
                <EmojiNatureSharpIcon fontSize="medium" />
              </div>
              Diagnos Your Favourites
            </button>
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
