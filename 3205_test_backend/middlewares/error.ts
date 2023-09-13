import { Request, Response, NextFunction } from "express";
const ErrorsHandler = (
  err: { statusCode: number; message: any },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Error on server" : err.message;
  res.status(statusCode).send({ message });
  next();
};
module.exports = ErrorsHandler;
