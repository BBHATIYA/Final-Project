import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";

export const VerifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken || req.headers["x-access-token"];

  if (accessToken == null) return res.sendStatus(401);
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (error, decoded) => {
      if (error) return res.sendStatus(403);

      try {
        const user = await Users.findAll({
          where: {
            email: decoded.email,
          },
        });
        await next();
      } catch (error) {
        return res.sendStatus(403);
      }
    }
  );
};
