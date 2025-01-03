/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

export default function AnimalTypeSelect({ animalType }) {
  const handleClickType = (value) => {
    animalType(value);
  };

  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: "#007FFF",
            dark: "#0066CC",
          },
        },
      }}
    >
      <div className="w-full pt-0 p-28  overflow-y-hidden  ">
        <div className="flex flex-col items-center  ">
          <div className="flex flex-col md:flex-row justify-center items-center h-screen space-y-4 md:space-y-0 md:space-x-4 ">
            <Box
              sx={{
                width: 300,
                height: 300,
                borderRadius: 1,
                marginRight: 3,
                backgroundImage:
                  'url("https://i.pinimg.com/236x/33/6b/91/336b915c15c456d29e1b78d4d7ec78c6.jpg")', // Replace with your image URL
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay on hover
                  backgroundBlendMode: "overlay",
                  "&::after": {
                    content: '"PETS"', // Text to display
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "50px",
                    fontWeight: "bold",
                    opacity: 1,
                  },
                },
                "&::after": {
                  content: '""',
                  opacity: 0,
                  position: "absolute",
                  transition: "opacity 0.3s",
                },
              }}
              onClick={() => handleClickType("pets")}
            />
            <Box
              sx={{
                width: 300,
                height: 300,
                borderRadius: 1,
                marginRight: 3,
                backgroundImage:
                  'url("https://i.pinimg.com/736x/31/c8/d9/31c8d997213c361b7beaeb5b16b5c86f.jpg")', // Replace with your image URL
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay on hover
                  backgroundBlendMode: "overlay",
                  "&::after": {
                    content: '"FARM"', // Text to display
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "50px",
                    fontWeight: "bold",
                    opacity: 1,
                  },
                },
                "&::after": {
                  content: '""',
                  opacity: 0,
                  position: "absolute",
                  transition: "opacity 0.3s",
                },
              }}
              onClick={() => handleClickType("farm")}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
