import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { DarkMode } from "../../context/Darkmode";
import {
  useTotalPrice,
  useTotalPriceDispatch,
} from "../../hooks/useTotalPrice";

const TableCart = ({ products }) => {
  const cart = useSelector((state) => state.cart.data);
  const { isDarkMode } = useContext(DarkMode);
  const dispatch = useTotalPriceDispatch();
  const totalPrice = useTotalPrice().total;

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart
        .reduce((acc, item) => {
          const product = products.find((product) => product.id === item.id);
          return acc + product.price * item.quantity;
        }, 0)
        .toFixed(2);
      dispatch({
        type: "UPDATE",
        payload: {
          total: sum,
        },
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products, dispatch]);

  const formatUsd = (price) => {
    return price.toLocaleString("en-US");
  };

  return (
    <>
      {cart.length === 0 ? (
        <p className="text-center text-red-600 font-bold text-xl mb-5">
          Keranjangnya masih kosong nich
        </p>
      ) : (
        <table className={`w-full text-left ${isDarkMode && "text-white"}`}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{formatUsd(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatUsd(item.price * item.quantity)}</td>
              </tr>
            ))}
            <tr className="space-row">
              <td> </td>
            </tr>
            <tr className="font-bold">
              <td colSpan={3}>Total</td>
              <td>{formatUsd(totalPrice)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableCart;
