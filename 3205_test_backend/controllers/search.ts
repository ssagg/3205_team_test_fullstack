import express, { Request, Response, Application, NextFunction } from "express";
const loadUsers = require("../models/users");
module.exports.getJson = (
  req: Request,

  res: Response,
  next: NextFunction
) => {
  const { email, number } = req.body;

  const data = loadUsers();

  const result = data.filter((item: any) => {
    return item.email === email;
  });
  console.log(result);
  setTimeout(() => {
    res.send(result);
  }, 5000);

  // if (!user) {
  //   throw new UnauthorizedError(USER_NOT_FOUND);
  // }
  // res.send({ jwt });
};
// module.exports = getJson;
