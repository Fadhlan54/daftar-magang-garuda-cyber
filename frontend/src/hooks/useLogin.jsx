// import { useEffect, useState } from "react";
// import { getUsername } from "../services/auth.service";

// export const useLogin = () => {
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUsername(getUsername(token));
//     } else {
//       document.location.href = "/login";
//     }
//   }, []);
//   return username;
// };

import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.service";

export const useLogin = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const usernameFromServer = await getUsername(token);
          setUsername(usernameFromServer);
        } catch (error) {
          console.error("Error fetching username:", error);
          // Handle error, misalnya dengan mengarahkan pengguna ke halaman login
          document.location.href = "/login";
        }
      } else {
        // Jika tidak ada token, arahkan pengguna ke halaman login
        document.location.href = "/login";
      }
    };

    fetchUsername();
  }, []);

  return username;
};
