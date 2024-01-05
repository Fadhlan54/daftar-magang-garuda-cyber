import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";
import Navbar from "../components/layouts/Navbar";
import {
  getTransactionDetail,
  payTransaction,
} from "../services/transaction.service";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Button from "../components/elements/Button";
import Swal from "sweetalert2";
import { getDetailUser } from "../services/auth.service";

const CheckoutPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { isDarkMode } = useContext(DarkMode);
  const [transaction, setTransaction] = useState({});
  const navigate = useNavigate();

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
    getTransactionDetail(id, (data, error) => {
      if (data) {
        setTransaction(data.transaction);
      } else {
        setError(error);
      }
    });
  }, [id]);

  const handlePay = () => {
    payTransaction(id, (data, error) => {
      if (data) {
        Swal.fire({
          title: "Pembayaran sukses",
          text: "Yeay! pembayaranmu sudah sukses",
          icon: "success",
          confirmButtonText: "Kembali ke Produk",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/products");
          }
        });

        getDetailUser(localStorage.getItem("token"), (data) => {
          setUser(data);
        });
      } else {
        Swal.fire({
          title: "Pembayaran gagal",
          text: `${error?.response?.data?.message}`,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/products");
          }
        });
      }
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <div
          className={`flex justify-center min-h-screen  ${
            isDarkMode ? "bg-slate-900" : "bg-white"
          }`}
        >
          <SideBar />
          <div className="w-4/5 flex flex-col items-center mt-7">
            {error && (
              <p className="py-2 text-white text-center my-4 bg-red-500 rounded">
                {error}
              </p>
            )}

            <div className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 w-2/3 text-white">
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Nama Product</p>
                <p className="text-lg col-span-3">
                  : {transaction.Product?.name}
                </p>
              </div>
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">
                  Status Transaksi
                </p>
                <p className="text-lg col-span-3">
                  :{" "}
                  {transaction?.status === "paid"
                    ? "Sudah dibayar"
                    : "Belum dibayar"}
                </p>
              </div>
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Harga</p>
                <p className="text-lg col-span-3">
                  : {currencyFormat(transaction?.productPrice)}
                  {` × ${transaction?.amount}`}
                </p>
              </div>

              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Total</p>
                <p className="text-lg col-span-3">
                  :{" "}
                  {currencyFormat(
                    transaction?.productPrice * transaction?.amount
                  )}
                </p>
              </div>
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Diskon</p>
                <p className="text-lg col-span-3">
                  : {currencyFormat(transaction?.discountPrice)}
                </p>
              </div>
              <hr className="my-4" />
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Total Semua</p>
                <p className="text-lg col-span-3">
                  : {currencyFormat(transaction?.totalPrice)}
                </p>
              </div>
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Saldo</p>
                <p className="text-lg col-span-3">
                  : {currencyFormat(user.balance)}
                </p>
              </div>
              <div className="my-2 grid grid-cols-4">
                <p className="text-xl font-semibold col-span-1">Sisa Saldo</p>
                <p className="text-lg col-span-3">
                  :{" "}
                  {user.balance - transaction?.totalPrice > 0
                    ? currencyFormat(user.balance - transaction?.totalPrice)
                    : `${currencyFormat(
                        user.balance - transaction?.totalPrice
                      )} (Saldo anda tidak mencukupi)`}
                </p>
              </div>
              <Button addClass="bg-blue-600 mt-7" onClick={handlePay}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
