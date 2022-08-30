import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";

import Mylogo from "./mylogo.png";

const Home = (props) => {
  const [token, setToken] = useState({});

  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decode = jwt_decode(accessToken);
      console.log(decode);
      setToken(decode);
      const expire = decode.exp;
      if (expire * 1000 < new Date().getTime()) {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
    // console.log("accessToken=>", accessToken);
    // const userid = decode.userid;
  }, []);

  return (
    <div className="home-maindiv">
      <h1>Welcome To Mix Couple Website!</h1>
      <div>
        <img src={Mylogo} alt="Logo" />
      </div>

      <h1>Home</h1>
      <p>
        Shalom!<br></br> This website is intended for mixed couples '1 Israeli
        and 1 foreign non Jewish partner' in order to share useful tips and
        information on a wide range of topics.
      </p>
      <ul>
        <li>Bureaucracy</li>
        <li>Rights and privileges</li>
        <li>Ideas</li>
        <li>Making connections and friends</li>
        <li>Learning from one another and from others' experiences</li>
      </ul>
      <p>
        This website is a safe environment for couples to share their
        experiences without being approached with unsolicited offers, and share
        information about Israeli bureaucracy, on sensitive matters related to
        personal lives and basic human rights. If you are not completely certain
        of some information, please refrain from sharing it in order to not
        mislead other people. Moreover, please avoid encouraging people to act
        against procedure or against the law. If you want to share a personal
        experience that involved an action that is against procedure, please
        state that explicitly in your post/comment.
      </p>
      <p>
        The idea is that together we can be wiser, smarter, happier and less
        frightened! Thank you and enjoy!
      </p>
    </div>
  );
};

export default Home;
