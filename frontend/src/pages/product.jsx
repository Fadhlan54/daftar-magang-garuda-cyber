import CardProduct from "../components/fragments/CardProduct";
import { useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { getProducts } from "../services/product.service";
import Navbar from "../components/layouts/Navbar";
import { DarkMode } from "../context/Darkmode";
import SideBar from "../components/fragments/sideBar";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    getProducts((data) => {
      setProducts(
        data.products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
          };
        })
      );
    });
  }, []);

  useLogin();

  return (
    <>
      <Navbar />
      <div
        className={`flex justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <SideBar />
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <CardProduct key={product.id}>
                  <CardProduct.Header
                    imageUrl={product.imageUrl}
                    id={product.id}
                  />
                  <CardProduct.Body productName={product.name}>
                    {product.description}
                  </CardProduct.Body>
                  <CardProduct.Footer price={product.price} id={product.id} />
                </CardProduct>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
