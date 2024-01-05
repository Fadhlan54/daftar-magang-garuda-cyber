import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";
import { getVouchers } from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";

const VoucherPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const statusValue = queryParams.get("status");
  const { isDarkMode } = useContext(DarkMode);
  const [voucher, setVoucher] = useState([]);

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleStatus = (status) => {
    if (!status) {
      navigate("");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("status", status);

    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    getVouchers(statusValue, (data, error) => {
      console.log(data);
      if (error) {
        return console.log(error);
      }
      setVoucher(data.voucher);
    });
  }, [statusValue]);

  useLogin();

  return (
    <>
      <Navbar />
      <div
        className={`flex justify-center min-h-screen ${
          isDarkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <SideBar />
        <div className="w-4/5 ">
          <div className="mx-4 mt-6 mb-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleStatus();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Semua
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={(e) => {
                e.preventDefault();
                handleStatus("unused");
              }}
            >
              Belum Digunakan
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={(e) => {
                e.preventDefault();
                handleStatus("used");
              }}
            >
              Sudah Digunakan
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center pe-6">
            {voucher.length > 0 &&
              voucher.map((item) => {
                return (
                  <div
                    className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 justify-between text-white max-h-80"
                    key={item.id}
                  >
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">
                        Voucher Code
                      </p>
                      <p className="text-lg col-span-3">
                        :{" "}
                        <span className="font-bold bg-indigo-600 px-2.5 py-1 rounded ml-2">
                          {item.voucherCode}
                        </span>
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">
                        Potongan Harga
                      </p>
                      <p className="text-lg col-span-3">
                        : {item.discountPrice}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">status</p>{" "}
                      <p className="text-lg col-span-3">
                        :{" "}
                        {item.isUsed ? (
                          <span className="bg-green-500 px-2.5 py-1 rounded ml-2 font-semibold">
                            Sudah digunakan
                          </span>
                        ) : (
                          <span className="bg-orange-400 px-2.5 py-1 rounded ml-2 font-semibold">
                            Belum digunakan
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">
                        Tanggal Kadaluarsa
                      </p>
                      <p className="text-lg col-span-3">
                        : {dateFormat(item.expiredAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoucherPage;
