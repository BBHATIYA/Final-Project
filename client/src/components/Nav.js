import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Mylogo from "./mylogo.png";
import "../App.css";

const Nav = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout")
      .then((response) => {
        alert("You have been successfully logged out!");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar">
      <div>
        <Button className="logo-div">
          <img src={Mylogo} alt="Logo" className="nav-logo" />
        </Button>

        <Link component={Link} to="/">
          <button className="nav-btn">HOME</button>
        </Link>

        <Link component={Link} to="/branch">
          <button className="nav-btn">BRANCHES</button>
        </Link>

        <Link component={Link} to="/post">
          <button className="nav-btn">POST</button>
        </Link>
      </div>

      <div className="rightnav">
        <Link component={Link} to="/login">
          <button className="nav-btn">LOGIN</button>
        </Link>

        <Link component={Link} to="/register">
          <button className="nav-btn">REGISTER</button>
        </Link>

        <Link component={Link} to="/logout" onClick={handleLogout}>
          <button className="nav-btn">LOGOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
