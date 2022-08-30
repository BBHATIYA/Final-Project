import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "usercomments",
  {
    id: {
      field: "commentid",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      field: "ucomment",
      type: DataTypes.TEXT,
    },
    userid: {
      field: "userid",
      type: DataTypes.INTEGER,
    },
    refpostid: {
      field: "refpostid",
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Comments;
