
import { AnimatedName } from "./AnimatedName";

function DoctorDashboardHomePage() {


  return (
    <div
      className="hero min-h-screen"
      style={{
        minHeight:'82vh',
        backgroundImage:
          "url(https://wallpapercave.com/wp/wp14189973.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <div className="flex mb-5 px-3 text-5xl font-bold">
          <AnimatedName
              text={`Hello`}
              className="custom-class mr-3"
              delay={50}
            />            <AnimatedName
              text={'Doctor'}
              className="custom-class"
              delay={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboardHomePage;
