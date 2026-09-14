import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const requireAuth: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "Non authentifié",
      });
      return;
    }
    const playload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof playload === "string") {
      res.status(401).json({
        message: "Token invalide",
      });

      return;
    }
    req.user = playload;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token invalide",
    });
    return;
  }
};

export default requireAuth;
