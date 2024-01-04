import { Link } from "react-router-dom";
import { DarkMode } from "../../context/Darkmode";
import { useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const AuthLayout = ({ children, title, subtitle, type }) => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div
      className={`flex justify-center min-h-screen items-center ${
        isDarkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      <button
        className="absolute top-5 right-5 bg-blue-600 p-2 px-4 text-white rounded"
        onClick={() => setIsDarkMode(!isDarkMode)}
        type="button"
      >
        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">{title}</h1>
        <p className="font-medium text-slate-500 mb-6">{subtitle}</p>
        {children}
        <p className="my-2 text-center">
          <Navigation type={type} />
        </p>
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  const { isDarkMode } = useContext(DarkMode);

  if (type === "login") {
    return (
      <>
        <span className={`${isDarkMode ? "text-white" : "text-black"}`}>
          {"Don't have an account? "}
        </span>
        <Link to="/register" className="text-blue-600">
          Register Now
        </Link>
      </>
    );
  }
  if (type === "register") {
    return (
      <>
        {"Already have an account? "}
        <Link to="/login" className="text-blue-600">
          Login Now
        </Link>
      </>
    );
  }
};

export default AuthLayout;
