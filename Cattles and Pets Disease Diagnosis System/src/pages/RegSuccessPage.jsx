import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function RegSuccessPage() {


  return (
    <>
    <div className="hero min-h-screen bg-slate-200">
      <div className="hero-content flex-col lg:flex-row-reverse px-4 lg:px-0">
        {/* Image Section */}
        <img
          src="https://i.pinimg.com/236x/d9/b7/bf/d9b7bf0a4b4c91c697295904a93627e3.jpg"
          className="max-w-sm rounded-lg shadow-2xl mb-6 lg:mb-0 lg:max-w-md"
        />
        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Congratulations ! Doctor</h1>
          <p className="py-6 text-sm lg:text-base">
            Once your verification is completed, you will get access to the dashboard. 
            Thank you for your patience 😇. Kindly attach your documents to xyz@gmail.com. 
            If you have any queries, feel free to contact the Administrator. Thank you🙏🏻
          </p>
          <Link to="/">
            <button className="btn btn-primary">Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
    <div className="divider"></div>
    <Footer/>
    </>
    
  );
}

export default RegSuccessPage;
