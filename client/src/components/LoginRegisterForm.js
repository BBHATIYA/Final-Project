import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../App";

const LoginRegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setAccessToken } = useContext(AppContext);

  let navigate = useNavigate();

  const handelAction = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post(
          "/register",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        console.log("register=>", response);

        navigate("/login");
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        console.log(response.data);
        setAccessToken(response.data);
        navigate("/");
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="login-register">
      <div>
        <h3>{props.title} Form</h3>
      </div>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"off"}>
        <TextField
          sx={{ m: 1 }}
          id="email"
          label="Enter email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          label="Enter password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handelAction}>
        {props.title}
      </Button>
      <div>
        <p>{msg}</p>
      </div>
      <div>
        {props.title === "Register" ? (
          <Link to="/login">Already have an account? Login here</Link>
        ) : (
          <Link to="/register">Don't have an account? Register here</Link>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterForm;
