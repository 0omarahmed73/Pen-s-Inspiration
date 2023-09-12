import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TypesProvider } from "./context/TypesContext.jsx";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TypesProvider>
        <FirebaseProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FirebaseProvider>
      </TypesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
