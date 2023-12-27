"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext({});
export default function RootLayout({ children }) {
  const router = useRouter();
  const [token, setToken] = useState(false);
  const checkToken = () => {
    if (window) {
      const localToken = localStorage.getItem("token");

      if (localToken === null) {
        router.push("/");
      } else {
        setToken(localToken);
      }
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <html lang="en">
      <body>
        <UserDataContext.Provider value={{ token }}>
          {children}
        </UserDataContext.Provider>
      </body>
    </html>
  );
}
