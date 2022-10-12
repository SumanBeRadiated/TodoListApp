import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { fetchUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { updateUser } from "../features/userSlice";
import Loading from "../components/Loading";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { ContextData } = useContext(AuthContext);
  const userState = useSelector((state) => state.user);
  const { userDetail, userLoading, userError } = userState;
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (ContextData.isAuth) {
      dispatch(fetchUser(ContextData.isAuth["access"]));
    }
  }, []);

  return (
    <div className="profile-container">
      {userLoading ? (
        <Loading />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {!showModal1 ? (
                    userDetail["username"]
                  ) : (
                    <>
                      <input
                        type="text"
                        name="username"
                        placeholder="New username"
                        value={
                          typeof username === "string"
                            ? username
                            : userDetail["username"]
                        }
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </>
                  )}
                </td>
                <td>
                  <Link
                    to=""
                    onClick={() => setShowModal1(showModal1 ? false : true)}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                </td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {!showModal2 ? (
                    userDetail["email"]
                  ) : (
                    <>
                      <input
                        type="text"
                        name="email"
                        placeholder="New email"
                        value={
                          typeof email === "string"
                            ? email
                            : userDetail["email"]
                        }
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </>
                  )}
                </td>
                <td>
                  <Link
                    to=""
                    onClick={() => setShowModal2(showModal2 ? false : true)}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              dispatch(
                updateUser({
                  data: {
                    username: username,
                    email: email,
                  },
                  accessToken: ContextData.isAuth["access"],
                })
              );
              setShowModal1(false);
              setShowModal2(false);
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
