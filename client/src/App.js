import LoginRegisterForm from "./components/LoginRegisterForm";
import PostComments from "./components/PostComments";
import { useState, createContext } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Branches from "./components/Branches";
// import Posts from "./components/Posts";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Auth } from "./auth/Auth";

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/branch"
            element={
              <Auth>
                <Branches />
              </Auth>
            }
          />
          <Route path="/post" element={<PostComments title={"post"} />} />
          <Route
            path="/login"
            element={<LoginRegisterForm title={"Login"} />}
          />
          <Route
            path="/register"
            element={<LoginRegisterForm title={"Register"} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
