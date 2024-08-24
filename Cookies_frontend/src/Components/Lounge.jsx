import { Link } from "react-router-dom";
// import loungeIllustration from "../../assets/lounge-illustration.svg"; // Example illustration import

const Lounge = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to the Lounge
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            This is the place where Admins and Editors can hang out, chat, and
            relax.
          </p>

          <div className="mt-8 space-x-4">
            <Link
              to="/home"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/admin"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
            >
              Go to Admin Page
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          {/* <img
            src={loungeIllustration}
            alt="Lounge Illustration"
            className="w-full max-w-md"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Lounge;
