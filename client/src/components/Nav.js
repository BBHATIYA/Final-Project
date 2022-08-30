import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Mylogo from "./mylogo.png";

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

        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/branch">
          Branches
        </Button>
        <Button component={Link} to="/post">
          Post
        </Button>
      </div>

      <div className="rightnav">
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/register">
          Register
        </Button>
        <Button component={Link} to="/logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Nav;
