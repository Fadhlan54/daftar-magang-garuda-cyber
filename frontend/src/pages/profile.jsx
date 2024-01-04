import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import { getDetailUser } from "../services/auth.service";
import SideBar from "../components/fragments/sideBar";

const Profile = () => {
  const [user, setUser] = useState({});
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    getDetailUser(localStorage.getItem("token"), (data) => {
      setUser(data);
    });
  }, []);

  useLogin();

  return (
    <>
      <Navbar />
      <div
        className={`flex justify-center min-h-screen  ${
          isDarkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <SideBar />
        <div className="w-4/5 flex flex-col items-center mt-20">
          <div className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 w-1/2 text-white">
            <div className="my-2 grid grid-cols-4">
              <p className="text-xl font-semibold col-span-1">Nama</p>
              <p className="text-lg col-span-3">: {user.name}</p>
            </div>
            <div className="my-2 grid grid-cols-4">
              <p className="text-xl font-semibold col-span-1">Email</p>
              <p className="text-lg col-span-3">: {user.email}</p>
            </div>
            <div className="my-2 grid grid-cols-4">
              <p className="text-xl font-semibold col-span-1">Saldo</p>
              <p className="text-lg col-span-3">
                :{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                  .format(user.balance)
                  .replace(/,\d{2}$/, "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
