import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors/errors";
import authService from "./auth.service";
import { ILoginPayload, ILoginServiceResponse } from "./auth.types";

class AuthController {
  /**
   * @description Login controller
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body as ILoginPayload;
    if (!email || !password) {
      throw new ValidationError({ data: req.body });
    }

    const { data, extraData } = await authService.login({
      email,
      password,
    });

    // convert token to base64 for cookie
    const base64Token = Buffer.from(extraData.token).toString("base64");

    res.cookie("__cookie", base64Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true on HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("__msid", Buffer.from(extraData.role).toString("base64"), {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true on HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ data });
  }
}

export default new AuthController();
