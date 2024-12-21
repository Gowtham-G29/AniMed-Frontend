import EmojiNatureSharpIcon from "@mui/icons-material/EmojiNatureSharp";
import NavBarMobile from "./NavBarMobile";
import NavBar from "./NavBar";
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
            "url(https://github.com/Gowtham-G29/Cattles-and-Pets-Disease-Diagnosis-System-Frontend/blob/6eae42a802813f48f63f9a082f7b5e2175295ab3/Cattles%20and%20Pets%20Disease%20Diagnosis%20System/src/assets/hero.jpeg)",
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
            <button className="btn btn-primary">
              <div className="flex ">
                <EmojiNatureSharpIcon fontSize="medium" />
              </div>
              Diagnos Your Favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
