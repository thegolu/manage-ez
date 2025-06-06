import bcrypt from "bcrypt";
import AuthModel from "../../models/auth.model";
import { CustomError, ValidationError } from "../../utils/errors/errors";
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from "../../utils/errors/error.constants";
import {
  IGetUserByEmailServiceResponse,
  ILoginPayload,
  ILoginServiceResponse,
  IRegisterPayload,
  IRegisterServiceResponse,
} from "./auth.types";
import { ACCESS_ROLES } from "../admin/admin.types";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import EmployeeModel from "../../models/employee.model";

class AuthService {
  // compare hash
  private async compareHash(string: string, hashString: string) {
    return bcrypt.compare(string, hashString);
  }

  // hash password
  private async hash(password: string) {
    const saltRounds = bcrypt.genSaltSync(
      Number(process.env.BCRYPT_HASH_SALT_ROUNDS) || 10
    );
    return bcrypt.hash(password, saltRounds);
  }

  // generate token
  private async generateToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  /**
   * Login a user
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns The logged in user
   */
  async login({
    email,
    password,
  }: ILoginPayload): Promise<ILoginServiceResponse> {
    const user = await AuthModel.findOne({ email });
    if (!user || !user.isActive) {
      throw new CustomError({
        message: ERROR_MESSAGES.USER_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const isValidPassword = await this.compareHash(password, user.password);
    if (!isValidPassword) {
      throw new CustomError({
        message: ERROR_MESSAGES.INVALID_PASSWORD,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    // get employee details
    const employee = await EmployeeModel.findOne({ user: user._id });

    // generate jwt token
    const token = await this.generateToken({
      email: user.email,
      name: user.name,
      role: user.role,
      eId: employee.employeeId,
    });

    return {
      extraData: { token, role: user.role },
      data: {
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    };
  }

  /**
   * Register a new user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param name - The name of the user
   * @param profilePicture - The profile picture of the user
   * @returns The new user
   */
  async register({
    email,
    password,
    name,
    profilePicture,
    phone,
    isSendIdInResp = false,
  }: IRegisterPayload): Promise<IRegisterServiceResponse> {
    const user = await AuthModel.findOne({ email });
    if (user) {
      throw new CustomError({
        message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const newUser = await AuthModel.create({
      email,
      phone,
      password: await this.hash(password),
      name,
      role: ACCESS_ROLES.USER,
      profilePicture,
    });

    return {
      _id: isSendIdInResp ? newUser._id : undefined,
      email: newUser.email,
      name: newUser.name,
      profilePicture: newUser.profilePicture,
      phone: newUser.phone,
    };
  }

  /**
   * @description Delete a user by id
   * @param {mongoose.Types.ObjectId} id
   */
  async deleteUserById(id: mongoose.Types.ObjectId): Promise<void> {
    if (!id) {
      throw new CustomError({
        message: ERROR_MESSAGES.INVALID_ID,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    await AuthModel.findByIdAndDelete(id);
    return;
  }

  /**
   * @description Get a user by email
   * @param email - The email of the user
   * @returns The user
   */
  async getUserByEmail(email: string): Promise<IGetUserByEmailServiceResponse> {
    const user = await AuthModel.findOne({ email });
    if (!user || !user.isActive) {
      throw new CustomError({
        message: ERROR_MESSAGES.USER_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  }
}

export default new AuthService();
