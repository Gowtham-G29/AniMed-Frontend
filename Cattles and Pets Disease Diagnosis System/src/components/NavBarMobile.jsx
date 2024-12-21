import PetsIcon from "@mui/icons-material/Pets";
import HamburgerIcon from "./HamburgerIcon";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

function NavBarMobile() {
  return (
    <div className="navbar fixed bg-slate-200 shadow-xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <HamburgerIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/register">
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Help ?</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <div className="flex px-1">
          <div>
            <PetsIcon fontSize="large" color="info" />
          </div>
          <a className=" font-bold text-blue-500 text-3xl mx-2">AniMed</a>
        </div>{" "}
      </div>
      <div className="navbar-end m-2">
        <LoginButton />
      </div>
    </div>
  );
}

export default NavBarMobile;
