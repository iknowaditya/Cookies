import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 space-x-12">
        <div className="text-center ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to the Admin's Page. Manage users and system settings.
          </p>

          <div className="mt-8 space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <Users />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/home"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Back to Home
              </Link>
              <Link
                to="/editor"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Go to Editor Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
