import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";
import SignupBox from "./components/SignupBox";
import LoginBox from "./components/LoginBox";
import AppNameHeader from "./components/AppNameHeader";
import Footer from "./components/Footer";
import AddTodolist from "./components/AddTodolist";
import ProfileScreen from "./screen/ProfileScreen";
import AddCategory from "./components/AddCategory";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppNameHeader />

        <Routes>
          <Route index path="/" element={<AddTodolist />} />
          <Route path="signup" element={<SignupBox />} />
          <Route path="login" element={<LoginBox />} />
          <Route
            path="addcategory"
            element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
