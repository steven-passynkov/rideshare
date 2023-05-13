import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { UserProvider } from "../contexts/UserContext";
import "@/styles/app.css";

/* const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryShadow: '$green200',
      
      // ...  more colors
    },
    space: {},
    fonts: {}
  }
}) */

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </UserProvider>
  );
}
