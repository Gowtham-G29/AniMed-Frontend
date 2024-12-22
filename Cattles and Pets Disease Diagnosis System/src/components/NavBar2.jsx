import PetsIcon from "@mui/icons-material/Pets";
// import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function NavBar2() {
  return (
    <div className="navbar fixed bg-slate-200 shadow-xl ">
      <div className="navbar-start px-1">
        <Link to="/">
          <ArrowBackIcon fontSize="large" />
          <HomeIcon fontSize="large" color="primary" />
        </Link>
      </div>
      <div className="navbar-center">
        <div className="flex px-1">
          <div>
            <PetsIcon fontSize="large" color="info" />
          </div>
          <a className=" font-bold text-blue-500 text-3xl mx-2">AniMed</a>
        </div>{" "}
      </div>
      <div className="navbar-end ">
        {/* <LoginButton /> */}
      </div>
    </div>
  );
}

export default NavBar2;
