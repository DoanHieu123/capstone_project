/* eslint-disable react-hooks/exhaustive-deps */
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./themes/ThemeProvider";
import NotSignInRoutes from "./routes/NotSignInRoutes";
import { Bounce, ToastContainer } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import AdminRoutes from "./routes/AdminRoutes";
import PartnerRoutes from "./routes/PartnerRoutes";
import UserRoutes from "./routes/UserRoutes";
import { checkLogin } from "./utils/helper";
import { useEffect } from "react";
import { authContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import ScrollToTopComponent from "./components/ScrollToTop/ScrollToTop.Component";

function App() {
  const navigate = useNavigate();

  const checkRole = () => {
    switch (secureLocalStorage.getItem("role")) {
      case "Admin":
        return <AdminRoutes />;
      case "Partner":
        return <PartnerRoutes />;
      case "Customer":
        return <UserRoutes />;
      default:
        return <NotSignInRoutes />;
    }
  };

  useEffect(() => {
    authContext(navigate);
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <div className="App">
        {checkLogin() ? checkRole() : <NotSignInRoutes />}
      </div>
      <ScrollToTopComponent />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ThemeProvider>
  );
}

export default App;
