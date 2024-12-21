import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link to="/login"> 
     <button className="btn bg-green-400 ">
      Login
      <div>
        <LoginSharpIcon fontSize="medium" />
      </div>
    </button>
    </Link>
   
  );
}

export default LoginButton;
