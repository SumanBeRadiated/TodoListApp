import React from "react";
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { addCategory } from "../features/categoryListSlice";
const AddCategory = () => {
  const [errMessage, setErrMessage] = useState(null);
  const { ContextData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");

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
            dispatch(
              addCategory({
                data: { categoryTitle: categoryTitle },
                accessToken: ContextData.isAuth["access"],
              })
            );
            navigate("/");
          }}
        >
          <div style={{ fontWeight: "900", fontSize: "2rem" }}>
            Add Category
          </div>
          {errMessage ? <div className="error">{errMessage}</div> : null}

          <div>
            <label>Category Title</label>
            <input
              type="text"
              name="category-tile"
              value={categoryTitle}
              placeholder="Category Title"
              onChange={(e) => setCategoryTitle(e.target.value)}
            />
          </div>

          <div>
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
