import { useContext } from "react";
import { useLogin } from "../../hooks/useLogin";
import Button from "../elements/Button";
import { DarkMode } from "../../context/Darkmode";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { user } = useContext(UserContext);
  const username = useLogin();

  return (
    <div className="flex justify-between bg-gray-800 text-white items-center px-10 py-3 text-md">
      <h1 className="font-bold">Test Magang Garuda</h1>
      <div>
        {username}

        <span className="text-center bg-zinc-200 p-2 px-5 rounded-md ml-5 text-slate-800">
          <span className="font-bold">Saldo:</span>{" "}
          <span className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            })
              .format(user.balance)
              .replace(/,\d{2}$/, "")}
          </span>
        </span>

        <Button
          addClass="bg-blue-600 ml-2 py-2 px-4 text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
