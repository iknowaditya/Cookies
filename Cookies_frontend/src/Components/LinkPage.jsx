import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Explore the Links
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Navigate through the public and private sections of the platform.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Public</h2>
            <div className="space-y-4">
              <Link
                to="/login"
                className="block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Register
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
              Private
            </h2>
            <div className="space-y-4">
              <Link
                to="/home"
                className="block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Home
              </Link>
              <Link
                to="/editor"
                className="block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Editors Page
              </Link>
              <Link
                to="/admin"
                className="block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Admin Page
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          {/* <img
            src={linkIllustration}
            alt="Links Illustration"
            className="w-full max-w-md"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default LinkPage;
