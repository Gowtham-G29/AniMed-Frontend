import { Typography } from "@mui/material";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-50">
      <div className="flex flex-col items-center">
        <Typography variant="h6">Please wait...</Typography>
        <>
          <div className="flex-col gap-4 w-full flex items-center justify-center mt-3">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Loader;
