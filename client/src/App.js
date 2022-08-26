import LoginRegisterForm from "./components/LoginRegisterForm";
import { useState, createContext } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Admin from "./components/Admin";
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
            path="/admin"
            element={
              <Auth>
                <Admin />
              </Auth>
            }
          />
          <Route
            path="/login"
            element={<LoginRegisterForm title={"login"} />}
          />
          <Route
            path="/register"
            element={<LoginRegisterForm title={"register"} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
