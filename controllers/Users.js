import Users from "../models/UsersModel.js";
import Branch from "../models/BranchModel.js";
import Posts from "../models/Posts.js";
import Comments from "../models/Comments.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getBranch = async (req, res) => {
  try {
    const branch = await Branch.findAll({
      attributes: [
        "branch_id",
        "city",
        "address",
        "telephone",
        "fax",
        "email",
        "allservices",
        "visadepartment",
      ],
    });
    res.json(branch);
  } catch (error) {
    console.log(error);
  }
};

export const allPost = async (req, res) => {
  console.log(req.body);
  const { post, userid } = req.body;

  try {
    const pst = await Posts.create({
      post: post,
      uid: userid,
    });
    res.json(pst);
  } catch (error) {
    console.log("allpost=>", error);
    res.json({ msg: "not good post" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Posts.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "post", "uid"],
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const allComments = async (req, res) => {
  console.log(req.body);

  const { ucomment, userid, refpostid } = req.body;

  try {
    const comnt = await Comments.create({
      comment: ucomment,
      userid: userid,
      refpostid: refpostid,
    });
    res.json(comnt);
  } catch (error) {
    console.log("allcomment=>", error);
    res.json({ msg: "not good comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const getcmt = await Comments.findAll({
      where: { refpostid: req.params.id },
      order: [["id", "DESC"]],
      attributes: ["id", "comment", "userid", "refpostid"],
    });
    res.json(getcmt);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Successful" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Email already exist" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) return res.status(404).json({ msg: "Wrong password" });

    const userId = user[0].id;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "300s",
      } // 5 minutes
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 300 * 1000,
    });
    res.json(accessToken);
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const logout = (req, res) => {
  const accessToken = req.cookie.accessToken;
  if (!accessToken) return res.sendStatus(204);
  res.clearCookie("accessToken");
  return res.sendStatus(200);
};
