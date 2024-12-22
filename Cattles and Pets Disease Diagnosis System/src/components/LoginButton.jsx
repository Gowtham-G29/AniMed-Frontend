import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link to="/login"> 
     <button className="btn bg-green-400 p-2 ">
      Login
      <div className="pt-1">
        <LoginSharpIcon fontSize="medium" />
      </div>
    </button>
    </Link>
   
  );
}

export default LoginButton;
