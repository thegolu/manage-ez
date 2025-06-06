import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/errors";
import { ERROR_MESSAGES, STATUS_CODES } from "../utils/errors/error.constants";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = Number(err.status) || STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (err instanceof CustomError) {
    res.status(statusCode).json({
      status: err.status,
      code: err.code,
      message: err.message || undefined,
      data: err.data,
    });
    return;
  }

  res.status(statusCode).json({
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    error: err?.message,
    stack: err?.stack,
  });
};
