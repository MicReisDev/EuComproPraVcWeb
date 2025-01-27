import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "./../store/slices/login-slice.js";
import axios from "../services/axiosInstance.js";

const useAuthExpiration = () => {
  const dispatch = useDispatch();
  const IsLogged = useSelector((state) => state.user.isLoggedIn);
  const jwt = localStorage.getItem("jwt");

  const protectedRoutes = ["/my-account"];
  function checkLogged() {
    const currentPath = window.location.pathname;
    if (!IsLogged && protectedRoutes.find((e) => e == String(currentPath))) {
      window.location.href = "/login-register";
    }
  }

  const checkToken = async () => {
    try {
      if (jwt) {
        // Faz a requisição para verificar o token
        const response = await axios.post("/auth/checktoken", { token: jwt });

        if (response?.status === 200) {
          dispatch(login(response.data));
        } else {
          handleLogout();
        }
      } else if (IsLogged) {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    if (jwt) localStorage.removeItem("jwt");
    window.location.pathname = "/login-register";
  };

  useEffect(() => {
    checkToken();
    checkLogged();
  }, [jwt, IsLogged]);

  return null;
};

export default useAuthExpiration;
