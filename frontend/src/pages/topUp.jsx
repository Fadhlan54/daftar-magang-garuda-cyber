import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import { getDetailUser, topUp } from "../services/auth.service";
import SideBar from "../components/fragments/sideBar";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import Button from "../components/elements/Button";

const TopUpPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { isDarkMode } = useContext(DarkMode);
  const [topUpAmount, setTopUpAmount] = useState(0);

  const currencyFormat = (value) => {
    if (value > 0) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      })
        .format(value)
        .replace(/,\d{2}$/, "");
    } else {
      return "Rp. 0";
    }
  };

  useEffect(() => {
    if (topUpAmount > 0) {
      topUp(localStorage.getItem("token"), topUpAmount, (data, error) => {
        if (error) {
          Swal.fire({
            title: "Topup gagal",
            text: `${error?.response?.data?.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        Swal.fire({
          title: "Top Up Sukses",
          text: `Selamat berhasil top up sebesar ${currencyFormat(
            topUpAmount
          )}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        getDetailUser(localStorage.getItem("token"), (data) => {
          setUser(data);
        });
      });
    }
  }, [topUpAmount, setUser]);

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
            <h1 className="text-xl text-center font-semibold">
              Saldo anda sekarang:{" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              })
                .format(user.balance)
                .replace(/,\d{2}$/, "")}
            </h1>
          </div>
          <div className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 w-1/2 text-white">
            <form
              className="w-full mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const amount = parseInt(e.target[0].value);
                if (!isNaN(amount) && amount > 0) {
                  setTopUpAmount(amount);
                  e.target[0].value = "";
                } else {
                  setTopUpAmount(0);
                  Swal.fire({
                    title: "Topup gagal",
                    text: `Jumlah top up harus diisi dan harus lebih dari 0`,
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                }
              }}
            >
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-900 dark:text-white text-xl"
                >
                  Jumlah (IDR)
                </label>
                <input
                  type="number"
                  min={0}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jumlah Top Up (IDR)"
                  required
                />
              </div>

              <Button
                type="submit"
                addClass="text-white bg-blue-700 hover:bg-blue-800 w-full  "
              >
                Top Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpPage;
