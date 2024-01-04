import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";
import { getVouchers } from "../services/auth.service";

const VoucherPage = () => {
  const { isDarkMode } = useContext(DarkMode);
  const [voucher, setVoucher] = useState([]);

  useEffect(() => {
    getVouchers((data, error) => {
      console.log(data);
      if (error) {
        return console.log(error);
      }
      setVoucher(data.voucher);
    });
  }, []);

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
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center pe-6">
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
                    <p className="text-lg col-span-3">: {item.voucherCode}</p>
                  </div>
                  <div className="my-2 grid grid-cols-4">
                    <p className="text-xl font-semibold col-span-1">
                      Potongan Harga
                    </p>
                    <p className="text-lg col-span-3">: {item.discountPrice}</p>
                  </div>
                  <div className="my-2 grid grid-cols-4">
                    <p className="text-xl font-semibold col-span-1">status</p>{" "}
                    <p className="text-lg col-span-3">
                      :{" "}
                      {item.isUsed ? (
                        <span className="bg-green-500 px-2.5 py-1 rounded ml-2">
                          Sudah digunakan
                        </span>
                      ) : (
                        <span className="bg-blue-500 px-2.5 py-1 rounded ml-2">
                          Belum digunakan
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="my-2 grid grid-cols-4">
                    <p className="text-xl font-semibold col-span-1">
                      Tanggal Kadaluarsa
                    </p>
                    <p className="text-lg col-span-3">: {item.expiredAt}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default VoucherPage;
