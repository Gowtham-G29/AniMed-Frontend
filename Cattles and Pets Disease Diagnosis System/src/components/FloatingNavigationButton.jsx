/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function FloatingNavigationButton({ setNavigateCurrent }) {
  const handleNavigateCurrent = () => {
    setNavigateCurrent((prev) => !prev); 
  };

  return (
    <div
      className="absolute bottom-4 right-4 p-4 text-white rounded-full shadow-lg"
      onClick={handleNavigateCurrent} 
    >
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab variant="extended">
          <NavigationIcon sx={{ mr: 1, color:'red'}} />
          Navigate
        </Fab>
      </Box>
    </div>
  );
}
