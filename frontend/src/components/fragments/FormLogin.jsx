import InputForm from "../elements/InputForm";
import Button from "../elements/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { getDetailUser, login } from "../../services/auth.service";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const HandleLogin = (event) => {
    event.preventDefault();
    // localStorage.setItem("email", event.target.email.value);
    // localStorage.setItem("password", event.target.password.value);

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        getDetailUser(res, (data) => {
          setUser(data);
        });
        navigate("/products");
      } else {
        setLoginFailed(res.response.data.message);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={HandleLogin}>
      {loginFailed && (
        <p className="py-2 text-white text-center my-4 bg-red-500 rounded">
          {loginFailed}
        </p>
      )}
      <InputForm
        name={"email"}
        placeholder={"Email"}
        type={"text"}
        ref={usernameRef}
      />
      <InputForm name={"password"} placeholder={"Password"} type={"password"} />

      <Button type="submit" addClass="bg-blue-600 w-full">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
