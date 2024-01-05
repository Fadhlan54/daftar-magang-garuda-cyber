import { Link } from "react-router-dom";

const CardProduct = ({ children }) => {
  return (
    <div className="card bg-gray-800 border-gray-700 rounded-lg shadow p-7 flex flex-col m-1 lg:m-2 justify-between text-white">
      {children}
    </div>
  );
};

const Header = ({ imageUrl, id }) => {
  return (
    <Link to={`/products/${id}`}>
      <img
        src={imageUrl}
        alt=""
        className="rounded-t-lg mb-5 h-44 w-full object-cover"
      />
    </Link>
  );
};

const Body = ({ productName, children }) => {
  return (
    <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight card-title  ">
        <a href="#">
          {productName.substring(0, 15)} {productName.length > 15 ? "..." : ""}
        </a>
      </h5>
      <p className="mb-4 font-normal product-description">
        {children.substring(0, 50)} {children.length > 50 ? "..." : ""}
      </p>
    </div>
  );
};

const Footer = ({ price, id }) => {
  return (
    <div className="items-start">
      <p className="text-xl font-bold text-white pb-3 text-left">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        })
          .format(price)
          .replace(/,\d{2}$/, "")}
      </p>
      <Link
        to={`/products/${id}`}
        type="submit"
        className=" bg-blue-600 w-full text-semibold  text-center text-white py-2 px-4 rounded-lg block mt-1 hover:bg-blue-700 focus:bg-blue-800"
      >
        Beli
      </Link>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
