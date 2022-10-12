import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adderTodo } from "../features/todoItemSlice";
import TodoList from "./TodoList";
import { todoItemAction } from "../features/todoItemSlice";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddTodolist = () => {
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const [addAnim, setAddedAnim] = useState("");
  const { ContextData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categorySelected, setcategorySelected] = useState(0);
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryList);
  const { catLoading, catData, catError, catFirstTimeLoading } = categoryState;
  const todoItemState = useSelector((state) => state.todoList);

  const addItemHandler = () => {
    if (itemName === "") {
      setError("Please fill up the todo title");
    } else {
      setError("");
      dispatch(
        adderTodo({
          data: { cat: categorySelected, todo_title: itemName },
          token: ContextData.isAuth["access"],
        })
      );
      setItemName("");
      setAddedAnim("todoItemAdded");
      setTimeout(() => {
        dispatch(todoItemAction.resetLastAddedItem());
      }, 2000);
    }
  };

  useEffect(() => {
    if (!!catData[0]) {
      setcategorySelected(catData[0]["id"]);
    }
  }, [catData]);

  return (
    <>
      <div className="add-item-fields section">
        <form>
          <div className="cat-selector">
            {catFirstTimeLoading || catData.length === 0 ? (
              <select name="category" id="category" disabled={true}>
                <option> Empty</option>
                );
              </select>
            ) : (
              <select
                name="category"
                id="category"
                value={categorySelected}
                onChange={(e) => setcategorySelected(e.target.value)}
              >
                {catData.map((item) => {
                  return (
                    <option key={item["id"]} value={item["id"]}>
                      {item["cat_title"]}
                    </option>
                  );
                })}
              </select>
            )}

            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                navigate("/addcategory");
              }}
            >
              <i>
                <ion-icon name="add-sharp"></ion-icon>
              </i>
            </Link>
          </div>

          <input
            onFocus={true}
            type="text"
            name="todo-title"
            value={itemName}
            placeholder="Enter your todo"
            onChange={(e) => setItemName(e.target.value)}
            disabled={ContextData.isAuth ? false : true}
          />
          <button
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => addItemHandler()}
            disabled={ContextData.isAuth ? false : true}
          >
            Add
          </button>
        </form>
        <br />
        <h2>{error}</h2>
      </div>
      <TodoList addedAnimation={addAnim} />
    </>
  );
};

export default AddTodolist;
