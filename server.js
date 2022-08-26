import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv";
import router from "./routes/Users.js";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server run on port ${process.env.PORT}`)
);

try {
  await db.authenticate();
  console.log("Database connected....");
} catch (error) {
  console.log(error);
}
