import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /[A-Za-z]{2,30}/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate(); // Hook for navigation

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_API}/register`,
        JSON.stringify({ user, email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Registration successful!");
      navigate("/login"); // Redirect to login page on success
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid Registration Data");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(
          `Registration Failed: ${
            err.response?.data?.message || "Unknown error"
          }`
        );
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Toaster />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
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
            Register
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
                <span className={validName ? "ml-2 text-green-500" : "hidden"}>
                  ✅
                </span>
                <span
                  className={
                    validName || !user ? "hidden" : "ml-2 text-red-500"
                  }
                >
                  ❌
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p
                className={`${
                  userFocus && user && !validName
                    ? "text-xs text-red-600 mt-1"
                    : "hidden"
                }`}
              >
                4 to 24 characters. Must begin with a letter. Letters, numbers,
                underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
                <span className={validEmail ? "ml-2 text-green-500" : "hidden"}>
                  ✅
                </span>
                <span
                  className={
                    validEmail || !email ? "hidden" : "ml-2 text-red-500"
                  }
                >
                  ❌
                </span>
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p
                className={`${
                  emailFocus && email && !validEmail
                    ? "text-xs text-red-600 mt-1"
                    : "hidden"
                }`}
              >
                Enter a valid email address.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
                <span className={validPwd ? "ml-2 text-green-500" : "hidden"}>
                  ✅
                </span>
                <span
                  className={validPwd || !pwd ? "hidden" : "ml-2 text-red-500"}
                >
                  ❌
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p
                className={`${
                  pwdFocus && !validPwd ? "text-xs text-red-600 mt-1" : "hidden"
                }`}
              >
                8 to 24 characters. Must include uppercase, lowercase, a number,
                and a special character.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm_pwd"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
                <span
                  className={
                    validMatch && matchPwd ? "ml-2 text-green-500" : "hidden"
                  }
                >
                  ✅
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? "hidden" : "ml-2 text-red-500"
                  }
                >
                  ❌
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p
                className={`${
                  matchFocus && !validMatch
                    ? "text-xs text-red-600 mt-1"
                    : "hidden"
                }`}
              >
                Must match the first password input field.
              </p>
            </div>

            <button
              type="submit"
              disabled={!validName || !validEmail || !validPwd || !validMatch}
              className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
