import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { ContextData } = useContext(AuthContext);
  useEffect(() => {
    if (!ContextData.isAuth) {
      navigate("/");
    }
  }, []);

  return <div>{children}</div>;
};

export default PrivateRoute;
