import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import Routers from "./routes/Routers";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={Routers}></RouterProvider>
    </StrictMode>
)