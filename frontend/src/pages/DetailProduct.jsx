import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProducts } from "../services/product.service";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";
import Navbar from "../components/layouts/Navbar";
import { createTransaction } from "../services/transaction.service";
import Swal from "sweetalert2";

const DetailProductPage = () => {
  const [error] = useState("");
  const { id } = useParams();
  const { isDarkMode } = useContext(DarkMode);
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  const increaseAmount = () => {
    setAmount((amount) => amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount((amount) => amount - 1);
    }
  };

  useEffect(() => {}, [amount]);

  useEffect(() => {
    getDetailProducts(id, (data) => {
      setProduct(data.product);
    });
  }, [id]);

  const handleCreateTransaction = (event) => {
    event.preventDefault();
    const data = {
      productId: product.id,
      amount: amount,
    };

    if (event.target.voucherCode.value) {
      data.voucherCode = event.target.voucherCode.value;
    }

    createTransaction(localStorage.getItem("token"), data, (status, res) => {
      if (status) {
        navigate(`/checkout/${status.data?.transaction?.id}`);
      } else {
        Swal.fire({
          title: "Pembayaran gagal",
          text: `${res?.response?.data?.message}`,
          icon: "error",
          confirmButtonText: "OK",
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
          <div className="w-4/5 flex flex-col items-center mt-20">
            {error && (
              <p className="py-2 text-white text-center my-4 bg-red-500 rounded">
                {error}
              </p>
            )}
            <div className=" flex justify-center items-center bg bg-gray-800 border-gray-700 rounded-lg text-white">
              {Object.keys(product).length > 0 && (
                <div className="flex font-sans max-w-xl">
                  <div className="flex-none w-48 relative">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
                      loading="lazy"
                    />
                  </div>
                  <form
                    className="flex-auto p-6"
                    onSubmit={handleCreateTransaction}
                  >
                    <div className="flex flex-wrap">
                      <h1 className="flex-auto text-lg font-semibold">
                        {product.name}
                      </h1>
                      <div className="text-lg font-semibold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(product.price * amount)
                          .replace(/,\d{2}$/, "")}
                      </div>
                    </div>
                    <div className="my-4">{product.description}</div>
                    <div className="font-bold text-lg ml-1">Jumlah</div>
                    <div className="flex justify-between items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                      <div className="space-x-2 flex text-sm">
                        <button>
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center  peer-checked:font-semibold bg-black text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              decreaseAmount();
                            }}
                          >
                            -
                          </div>
                        </button>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center  peer-checked:font-semibold ">
                          {amount}
                        </div>
                        <button>
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center  peer-checked:font-semibol peer-checked:text-white bg-black"
                            onClick={(e) => {
                              e.preventDefault();
                              increaseAmount();
                            }}
                          >
                            +
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-4 mb-6 text-sm font-medium">
                      <div className=" flex space-x-4 items-end">
                        <div>
                          <label
                            htmlFor="voucherCode"
                            className="block text-white text-sm font-bold mb-2"
                          >
                            Kode Voucher
                          </label>
                          <input
                            type="text"
                            id="voucherCode"
                            name="voucherCode"
                            className="text-sm border rounded w-full py-2 px-3 text-slate-700"
                            placeholder="Masukkan Kode Voucher"
                          />
                        </div>
                        <button
                          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                          type="submit"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                    <p className="text-sm">
                      Dapatkan voucher diskon sebesar Rp 10.000 untuk pembelian
                      minimal Rp 2.000.000
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
