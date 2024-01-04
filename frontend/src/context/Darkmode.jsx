import { createContext, useState } from "react";

const DarkmodeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <DarkmodeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export const DarkMode = DarkmodeContext;
export default DarkModeContextProvider;
