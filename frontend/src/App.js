import Home from "./pages/home/Home";
import Profile from "pages/profile/Profile";
import Login from "pages/login/Login";
import Messenger from "pages/messenger/Messenger";
import Register from "pages/register/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import Edit from "pages/edit/Edit";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace={true} /> : <Login />}
      />
      <Route
        path="/register"
        element={!user ? <Navigate to="/" replace={true} /> : <Register />}
      />
      <Route
        path="/messenger"
        element={!user ? <Navigate to="/" replace={true} /> : <Messenger />}
      />
      <Route
        path="/edit"
        element={!user ? <Navigate to="/" replace={true} /> : <Edit />}
      />
    </Routes>
  );
}

export default App;
