import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";
import { getTransactionHistory } from "../services/transaction.service";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useContext(DarkMode);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const statusValue = queryParams.get("status");

  useEffect(() => {
    getTransactionHistory(statusValue, (data, error) => {
      if (error) {
        if (error.response?.status === 404) {
          return setTransactionHistory([]);
        }
        return console.log(error);
      }
      setTransactionHistory(data.transactions);
    });
  }, [statusValue]);

  const handleStatus = (status) => {
    if (!status) {
      navigate("");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("status", status);

    navigate(`?${queryParams.toString()}`);
  };

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
                handleStatus("unpaid");
              }}
            >
              Belum Bayar
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={(e) => {
                e.preventDefault();
                handleStatus("paid");
              }}
            >
              Sudah Dibayar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center pe-6">
            {transactionHistory.length > 0 &&
              transactionHistory.map((item) => {
                return (
                  <div
                    className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 justify-between text-white"
                    key={item.id}
                  >
                    {item.status === "unpaid" && (
                      <Link
                        to={`/checkout/${item.id}`}
                        className="py-2 text-white text-center my-4 bg-red-600 hover:bg-red-800 rounded font-bold"
                      >
                        Belum Bayar
                      </Link>
                    )}
                    {item.status === "paid" && (
                      <p className="py-2 text-white text-center my-4 bg-green-600 rounded font-bold">
                        Sudah dibayar
                      </p>
                    )}
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">Nama</p>
                      <p className="text-lg col-span-3">
                        : {item.Product?.name}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">
                        Harga satuan
                      </p>
                      <p className="text-lg col-span-3">
                        : {item.productPrice}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">Jumlah</p>
                      <p className="text-lg col-span-3">: {item.amount}</p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">Diskon</p>
                      <p className="text-lg col-span-3">
                        : {item.discountPrice}
                      </p>
                    </div>
                    <div className="my-2 grid grid-cols-4">
                      <p className="text-xl font-semibold col-span-1">
                        Total Harga
                      </p>
                      <p className="text-lg col-span-3">: {item.totalPrice}</p>
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

export default TransactionHistoryPage;
