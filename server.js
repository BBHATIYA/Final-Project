import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv";
import router from "./routes/Users.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors());
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

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
