import { createContext, useState } from "react";
import { getDetailUser } from "../services/auth.service";

const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useState(() => {
    if (localStorage.getItem("token")) {
      getDetailUser(localStorage.getItem("token"), (data) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const UserContext = userContext;
export default UserContextProvider;
