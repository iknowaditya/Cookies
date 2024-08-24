import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = "/home" || "/login";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_API}/login`,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
      toast.success("Successfully logged in!");
      navigate("/home", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
        toast.error("Unauthorized");
      } else {
        setErrMsg("Login Failed");
        toast.error("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Toaster />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
          <p
            ref={errRef}
            className={`${
              errMsg ? "text-red-600 text-center" : "hidden"
            } text-sm`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
