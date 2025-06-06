import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../utils/errors/errors";
import { IDecodedToken } from "../common/types";
import { ACCESS_ROLES } from "../modules/admin/admin.types";

declare global {
  namespace Express {
    interface Request {
      user: Omit<IDecodedToken, "eId"> & { employeeId: string };
    }
  }
}

const verifyToken = (
  token: string,
  callbackFn: (err: any, decoded: IDecodedToken) => void
) => {
  return jwt.verify(token, process.env.JWT_SECRET, callbackFn);
};

/**
 * @description Middleware to authenticate the user
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie
    ?.split(";")
    ?.filter((c) => c.includes("__cookie"))?.[0]
    ?.split("=")?.[1];

  if (!token) {
    throw new UnAuthorizedError({});
  }

  // decode the token
  const decodeCookie = decodeURIComponent(token);
  const decodedToken = Buffer.from(decodeCookie, "base64").toString("utf-8");

  verifyToken(decodedToken, (err: any, decoded: IDecodedToken) => {
    if (err || !decoded.eId || !decoded.email) {
      throw new UnAuthorizedError({ data: err });
    }

    req.user = {
      email: decoded.email,
      employeeId: decoded.eId,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  });
};

const AdminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.cookie
    .split(";")
    .filter((c) => c.includes("__cookie"))[0]
    ?.split("=")[1];

  if (!token) {
    throw new UnAuthorizedError({});
  }

  verifyToken(token, (err: any, decoded: IDecodedToken) => {
    if (err || decoded.role !== ACCESS_ROLES.ADMIN) {
      throw new UnAuthorizedError({ data: err });
    }
    req.user = {
      email: decoded.email,
      employeeId: decoded.eId,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  });
};

export { AuthMiddleware, AdminAuthMiddleware };
