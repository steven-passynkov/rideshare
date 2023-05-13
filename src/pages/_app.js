import { useState } from "react";
import { AppProvider } from "../contexts/appcontext";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react";

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
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AppProvider> 
      <NextUIProvider >
        <Component {...pageProps} />
        </NextUIProvider>
      </AppProvider>
    </SessionContextProvider>
  );
}
