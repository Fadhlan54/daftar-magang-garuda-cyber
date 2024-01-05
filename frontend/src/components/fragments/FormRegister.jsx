import { useContext, useState } from "react";
import Button from "../elements/Button";
import InputForm from "../elements/InputForm";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getDetailUser, register } from "../../services/auth.service";

const FormRegister = () => {
  const [registerFailed, setRegisterFailed] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    if (event.target.password.length < 8) {
      setRegisterFailed("Password minimal 8 karakter");
      return;
    }

    if (event.target.password.value !== event.target.confirmPassword.value) {
      setRegisterFailed("Password tidak sama");
      return;
    }

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };

    register(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        getDetailUser(res, (data) => {
          setUser(data);
        });
        navigate("/products");
      } else {
        setRegisterFailed(res.response.data.message);
      }
    });
  };

  return (
    <form onSubmit={handleRegister}>
      {registerFailed && (
        <p className="py-2 text-white text-center my-4 bg-red-500 rounded font-semibold">
          {registerFailed}
        </p>
      )}
      <InputForm placeholder={"Nama Lengkap"} name={"name"} type={"text"} />
      <InputForm placeholder={"Email"} name={"email"} type={"email"} />
      <InputForm placeholder={"Password"} name={"password"} type={"password"} />
      <InputForm
        placeholder={"Konfirmasi Password"}
        name={"confirmPassword"}
        type={"password"}
      />

      <Button type="submit" addClass="bg-blue-600 w-full">
        Register
      </Button>
    </form>
  );
};

export default FormRegister;
