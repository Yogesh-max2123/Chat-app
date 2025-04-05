import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx"; // ✅ Ensure correct import path
import App from "./App";
import {Provider} from 'react-redux'
import {store} from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} >
       <App/>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
