import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Mylogo from "./mylogo.png";

const Nav = (props) => {
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
      </div>
    </div>
  );
};

export default Nav;
