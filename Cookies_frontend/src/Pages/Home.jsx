import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import illustration from "../assets/illu.svg"; // Example illustration import
// import axios from "../../api/axios";

// const LOGOUT_URL = "/logout";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Make a POST request to the logout route on the server
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        { withCredentials: true }
      );

      // Clear auth state on successful logout
      setAuth({});

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to Your Dashboard!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            You have successfully logged in. Feel free to explore the pages
            below.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/editor"
              className="bg-gray-300 text-neutral-700 px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-gray-200 transition-all"
            >
              Go to Editor
            </Link>
            <Link
              to="/admin"
              className="bg-gray-300 text-neutral-700 px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-gray-200 transition-all"
            >
              Go to Admin
            </Link>
            <Link
              to="/lounge"
              className="bg-gray-300 text-neutral-700 px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-gray-200 transition-all"
            >
              Go to Lounge
            </Link>
            <Link
              to="/linkpage"
              className="bg-gray-300 text-neutral-700 px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-gray-200 transition-all"
            >
              Go to Link Page
            </Link>
          </div>
          <button
            onClick={logout}
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-medium hover:bg-red-600 transition-all"
          >
            Sign Out
          </button>
        </div>
        <div className="hidden md:block">
          <img
            src={illustration}
            alt="Hero Illustration"
            className="overflow-hidden w-full "
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
