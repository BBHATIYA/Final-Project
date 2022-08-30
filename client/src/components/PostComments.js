import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../App";
import "../App.css";

// import { decode } from "jsonwebtoken";

const PostComments = (props) => {
  const [post, setPost] = useState("");
  const [getpost, setGetpost] = useState([]);
  const [comment, setComment] = useState("");
  const [getcomment, setGtcomment] = useState([]);

  const { accessToken } = useContext(AppContext);
  let navigate = useNavigate();
  const handelAction = async () => {
    let decode;
    try {
      decode = jwt_decode(accessToken);

      const expire = decode.exp;
      if (expire * 1000 < new Date().getTime()) {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }

    try {
      const userid = decode.userId;
      const response = await axios.post(
        "/post",
        {
          post,
          userid,
        },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      console.log("post=>", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelComments = async (refpostid) => {
    let decode;
    try {
      decode = jwt_decode(accessToken);

      const expire = decode.exp;
      if (expire * 1000 < new Date().getTime()) {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }

    try {
      const userid = decode.userId;

      const response = await axios.post(
        "/comments",
        {
          ucomment: comment,
          userid,
          refpostid,
        },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      console.log("comments=>", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSeeComments = async (refpostid) => {
    try {
      const response = await axios.get(`/comments/${refpostid}`);
      const data = await response.data;
      setGtcomment(data);
    } catch (error) {
      console.log(error);
    }
  };

  //featching all post
  useEffect(() => {
    fetch("/post")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setGetpost(data);
      });
  }, []);

  // featching all comments
  // useEffect(() => {
  //   fetch("/comments")
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       setGtcomment(data);
  //     });
  // }, []);

  return (
    <div>
      <h1>All Post</h1>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"off"}>
        <TextField
          sx={{ m: 1 }}
          id="post"
          label="Write post..."
          variant="outlined"
          onChange={(e) => setPost(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handelAction}>
        Add Post
      </Button>
      <div>
        {getpost
          ? getpost.map((item) => {
              return (
                <div key={item.id} className="post-card">
                  <div className="all-post">
                    <b>Post Id:</b> {item.id}
                    <br></br>
                    <b>Post:</b> {item.post}
                    <br></br>
                    <b>userid:</b> {item.uid}
                  </div>
                  {getcomment.map((item, index) => {
                    return (
                      <div key={index} className="commnet-div">
                        <p>{item.comment}</p>
                        <p>User Id: {item.userid}</p>
                        <p>Post Id: {item.refpostid}</p>
                      </div>
                    );
                  })}
                  <Box
                    component={"form"}
                    sx={{ m: 1 }}
                    noValidate
                    autoComplete={"off"}
                  >
                    <TextField
                      sx={{ m: 1 }}
                      id="comment"
                      label="Write comment..."
                      variant="outlined"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => handelComments(item.id)}
                  >
                    Add Comments
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handelSeeComments(item.id)}
                  >
                    See Comments
                  </Button>
                </div>
              );
            })
          : "Unauthorized"}
      </div>
    </div>
  );
};

export default PostComments;
