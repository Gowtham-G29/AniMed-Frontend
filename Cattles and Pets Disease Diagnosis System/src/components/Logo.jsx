import PetsIcon from "@mui/icons-material/Pets";

function Logo() {
  return (
    <div className="flex px-1">
      <div>
        <PetsIcon fontSize="large" color="info" />
      </div>
      <a className=" font-bold text-blue-500 text-3xl mx-2">AniMed</a>
    </div>
  );
}

export default Logo;
