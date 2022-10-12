import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTodoItem } from "../features/todoItemSlice";
import { fetchCategory } from "../features/categoryListSlice";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("creds")
      ? JSON.parse(localStorage.getItem("creds"))
      : null
  );

  const [loginError, setLoginError] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "/api/token/",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsAuth(res["data"]);
        localStorage.setItem("creds", JSON.stringify(res["data"]));
        setLoginError(null);
        navigate("");
      })
      .catch((error) => {
        setLoginError(error.response.data.detail);
      });
  };

  const refreshToken = async () => {
    await axios
      .post(
        "/api/token/refresh/",
        { refresh: isAuth["refresh"] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuth["access"]}`,
          },
        }
      )
      .then((res) => {
        setIsAuth(res["data"]);
        localStorage.setItem("creds", JSON.stringify(res["data"]));
        setLoginError(null);
      })
      .catch((error) => {
        setLoginError(error.response.data.detail);
        setIsAuth(null);
      });
  };

  const signupUser = async (data, e) => {
    await axios
      .post("/api/user/signup/", data)
      .then((res) => {
        loginUser(e);
      })
      .catch((error) => setLoginError(error.response.data));
  };

  const lougoutUser = async () => {
    await axios
      .post(
        "/api/token/blacklist/",
        { refresh: isAuth.refresh },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuth.access}`,
          },
        }
      )
      .then((res) => {
        setIsAuth(null);
        localStorage.removeItem("creds");
      });
    window.location.reload();
  };

  const ContextData = {
    isAuth: isAuth,
    loginUser: loginUser,
    loginError: { loginError, setLoginError },
    signupUser: signupUser,
    lougoutUser: lougoutUser,
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (isAuth) {
        refreshToken();
      }
    }, 1000 * 3300);
    return () => clearInterval(id);
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ ContextData: ContextData }}>
      {children}
    </AuthContext.Provider>
  );
};
