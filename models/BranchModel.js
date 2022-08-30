import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Branch = db.define(
  "branch",
  {
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    fax: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    allservices: {
      type: DataTypes.STRING,
    },
    visadepartment: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Branch;
