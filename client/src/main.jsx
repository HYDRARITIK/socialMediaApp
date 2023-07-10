import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { DarkModeProvider } from "./context/darkModeContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query-devtools";
const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {/* The rest of your application */}
    <AuthProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </AuthProvider>

    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
);
