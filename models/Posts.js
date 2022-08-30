import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Posts = db.define(
  "post",
  {
    id: {
      field: "postid",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post: {
      field: "post",
      type: DataTypes.TEXT,
    },
    uid: {
      field: "userid",
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Posts;
