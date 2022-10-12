import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { TransitionContext } from "../transtionContext/TransitionContext";
import { AuthContext } from "../context/AuthContext";
const AppNameHeader = () => {
  const navigate = useNavigate();
  const { ContextData } = useContext(AuthContext);

  return (
    <div className="header-title section">
      <div className="header-nav">
        {ContextData.isAuth ? (
          <>
            <span>
              <Link to="/profile">
                <i>
                  <ion-icon name="person-circle-outline"></ion-icon>
                </i>
                Profile
              </Link>
            </span>
            <span>
              <Link
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  ContextData.lougoutUser();
                  navigate("/");
                }}
              >
                <i>
                  <ion-icon name="log-out-outline"></ion-icon>
                </i>
                Logout
              </Link>
            </span>
          </>
        ) : (
          <>
            <span>
              <Link to="/login">
                <i>
                  <ion-icon name="log-in-outline"></ion-icon>
                </i>
                Login
              </Link>
            </span>
            <span>
              <Link to="/signup">
                <i>
                  <ion-icon name="person-add-outline"></ion-icon>
                </i>
                Signup
              </Link>
            </span>
          </>
        )}
      </div>

      <Link to="/">
        <h1>TODO LIST APP</h1>
        <p>by SumanBeRadiated</p>
      </Link>
    </div>
  );
};

export default AppNameHeader;
