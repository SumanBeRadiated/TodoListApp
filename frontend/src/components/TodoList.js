import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTodoItem, updateTodo } from "../features/todoItemSlice";
import { fetchCategory } from "../features/categoryListSlice";
import { todoItemAction } from "../features/todoItemSlice";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { delCategory } from "../features/categoryListSlice";

const style = {
  color: "white",
  textDecoration: "none",
};

const TodoList = ({ addedAnimation }) => {
  const { ContextData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [strikeAnim, setStrikeAnim] = useState([]);

  const todoItemState = useSelector((state) => state.todoList);

  const categoryState = useSelector((state) => state.categoryList);

  const {
    todoLoading,
    todoData,
    todoError,
    displayedData,
    lastAddedId,
    displayedCatId,
    todoFirstTimeLoading,
  } = todoItemState;

  const { catLoading, catData, catError, catFirstTimeLoading } = categoryState;

  const categorySelectHandler = (e, catId) => {
    e.preventDefault();
    dispatch(todoItemAction.selectCategory(catId));
  };

  useEffect(() => {
    if (ContextData.isAuth) {
      dispatch(fetchTodoItem(ContextData.isAuth["access"]));
    }
    if (ContextData.isAuth) {
      dispatch(fetchCategory(ContextData.isAuth["access"]));
    }
  }, []);

  return (
    <div className="list-body section">
      {/* Category Selection */}
      {catData.length > 0 ? (
        <>
          <div className="category-list">
            {catFirstTimeLoading ? (
              // <h1>Loading</h1>

              <Loading />
            ) : (
              catData.map((item) => {
                return (
                  <div
                    className="category-item"
                    key={item["id"]}
                    style={
                      item["id"] === displayedCatId
                        ? { fontWeight: "400" }
                        : { fontWeight: "300" }
                    }
                  >
                    <Link
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          delCategory({
                            data: item["id"],
                            token: ContextData.isAuth["access"],
                          })
                        );
                      }}
                    >
                      <i>
                        <ion-icon name="trash-sharp"></ion-icon>
                      </i>
                    </Link>
                    <Link
                      style={style}
                      to="/"
                      onClick={(e) => categorySelectHandler(e, item["id"])}
                    >
                      {item["cat_title"]}
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          <div className="list-item">
            {todoFirstTimeLoading ? (
              <Loading />
            ) : (
              displayedData.map((item) => {
                return (
                  <div
                    key={item["id"]}
                    className={`${
                      lastAddedId === item["id"] ? addedAnimation : ""
                    } todoItem ${
                      strikeAnim.find((x) => x === Number(item["id"]))
                        ? "todo-deleting"
                        : ""
                    }`}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                      }}
                    >
                      {item["todo_title"]}
                      <div
                        className={`strike unstriked ${
                          strikeAnim.find((x) => x === Number(item["id"]))
                            ? "striking"
                            : ""
                        }`}
                      ></div>
                    </div>

                    <span class="check-todo">
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          setStrikeAnim([...strikeAnim, item["id"]]);

                          dispatch(
                            updateTodo({
                              data: { id: item["id"] },
                              accessToken: ContextData.isAuth["access"],
                            })
                          );
                        }}
                      >
                        <i>
                          <ion-icon name="checkbox-outline"></ion-icon>
                        </i>
                      </Link>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        <div className="list-status">
          <div>
            List Empty
            <i>
              <ion-icon name="close"></ion-icon>
            </i>
          </div>
          <div className="signup-to-add">
            <Link to="signup">Sign up</Link> to use the app. Have account
            already? <Link to="signup">Log in</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
