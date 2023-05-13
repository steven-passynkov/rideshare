import { useState } from "react";
import { AppProvider } from "../contexts/Appcontext";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AppProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </AppProvider>
    </SessionContextProvider>
  );
}
