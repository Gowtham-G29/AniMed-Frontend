import PetsIcon from "@mui/icons-material/Pets";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navbar fixed bg-slate-200 shadow-xl ">
      <div className="flex-1 mx-7">
        <div className="flex px-1">
          <div>
            <PetsIcon fontSize="large" color="info" />
          </div>
          <a className=" font-bold text-blue-500 text-3xl mx-2">AniMed</a>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-5 flex ">
          <div className="flex mt-1.3  mr-2 text-lg  font-bold">
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Help ?</a>
            </li>
            <li>
              <Link to="/register">
                <a>Sign Up</a>
              </Link>
            </li>
          
          </div>
          <LoginButton />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
