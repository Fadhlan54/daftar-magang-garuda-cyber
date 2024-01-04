import { useContext } from "react";
import { DarkMode } from "../../context/Darkmode";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { isDarkMode } = useContext(DarkMode);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-1/5">
      <div className="border-r border-r-gray-700 shadow h-full py-2">
        <h1 className="text-3xl font-bold text-blue-600 text-center mt-4 mb-8">
          Menu
        </h1>
        <Link
          to={"/products"}
          className={`${
            isDarkMode ? "text-white" : "text-black hover:text-white"
          } w-full text-xl font-semibold hover:bg-slate-800 p-2  block text-center`}
        >
          Produk
        </Link>
        <Link
          to={"/profile"}
          className={`${
            isDarkMode ? "text-white" : "text-black hover:text-white"
          } w-full text-xl font-semibold hover:bg-slate-800 p-2  block text-center`}
        >
          Profil
        </Link>
        <Link
          to={"/top-up"}
          className={`${
            isDarkMode ? "text-white" : "text-black hover:text-white"
          } w-full text-xl font-semibold hover:bg-slate-800 p-2  block text-center`}
        >
          Top Up
        </Link>
        <Link
          to={"/transactions/history"}
          className={`${
            isDarkMode ? "text-white" : "text-black hover:text-white"
          } w-full text-xl font-semibold hover:bg-slate-800 p-2  block text-center`}
        >
          Histori Pembayaran
        </Link>
        <Link
          to={"/vouchers"}
          className={`${
            isDarkMode ? "text-white" : "text-black hover:text-white"
          } w-full text-xl font-semibold hover:bg-slate-800 p-2  block text-center`}
        >
          Voucher
        </Link>
        <button
          className="text-white w-full text-xl font-semibold hover:bg-red-700 p-2 block text-center bg-red-600 mt-8"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
