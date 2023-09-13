import { Request, Response, NextFunction } from "express";
const loadUsers = require("../models/users");
const NotFoundError = require("../errors/NotFoundError");
const {
  INVALID_USER_DATA,
  USER_NOT_FOUND,
  INVALID_USER_NUMBER,
} = require("../errors/Errors");

module.exports.getJson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, number } = req.body;
    const data = loadUsers();
    const user = data.filter((item: any) => {
      return item.email === email;
    });
    if (!user.length) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    setTimeout(() => {
      res.send(user);
    }, 5000);
  } catch (error) {
    next(error);
  }
};
