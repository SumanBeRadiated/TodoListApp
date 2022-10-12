import React from "react";
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginBox = () => {
  const [errMessage, setErrMessage] = useState(null);
  const { ContextData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [anDarkOverlay, setanDarkOverlay] = useState("");
  const [anSignupBox, setanSignupBox] = useState("");

  const body = document.querySelector("body");

  useEffect(() => {
    setTimeout(() => {
      setanDarkOverlay("dark-overlay");
      setanSignupBox("signup-box-trans");
    }, 100);
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
      setanDarkOverlay("");
      setanSignupBox("");
      setErrMessage(null);
      ContextData.loginError.setLoginError(null);
    };
  }, [body]);

  return (
    <>
      <div
        className={anDarkOverlay}
        onClick={() => {
          navigate("/");
        }}
      ></div>
      <div className={`signup-box ${anSignupBox}`}>
        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            setErrMessage(null);
            ContextData.loginError.setLoginError(null);

            if (username && password) {
              ContextData.loginUser(e);
            } else {
              setErrMessage("Fields can't be empty.");
            }
          }}
        >
          <div style={{ fontWeight: "900", fontSize: "2rem" }}>Login</div>
          {errMessage ? (
            <div className="error">{errMessage}</div>
          ) : ContextData.loginError.loginError ? (
            <div className="error">{ContextData.loginError.loginError}</div>
          ) : null}

          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginBox;
