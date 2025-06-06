import bcrypt from "bcrypt";
import AuthModel from "../../models/auth.model";
import { ACCESS_ROLES, ICreateAdminUserPayload } from "./admin.types";
import { CustomError } from "../../utils/errors/errors";
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from "../../utils/errors/error.constants";

class AdminService {
  private async hash(password: string) {
    const saltRounds = bcrypt.genSaltSync(
      Number(process.env.BCRYPT_HASH_SALT_ROUNDS) || 10
    );
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * @description Create a new admin user
   * @param email - The email of the admin user
   * @param password - The password of the admin user
   * @param name - The name of the admin user
   * @param profilePicture - The profile picture of the admin user
   * @param phone - The phone number of the admin user
   * @returns The new admin user
   */
  async createAdminUser({
    email,
    password,
    name,
    profilePicture,
    phone,
  }: ICreateAdminUserPayload) {
    const isExistingUser = await AuthModel.findOne({ email });
    if (isExistingUser) {
      throw new CustomError({
        message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
        status: STATUS_CODES.BAD_REQUEST,
        data: { email },
      });
    }

    // hash password
    const hashedPassword = await this.hash(password);

    const user = await AuthModel.create({
      email,
      password: hashedPassword,
      name,
      phone,
      role: ACCESS_ROLES.ADMIN,
      profilePicture,
    });

    return {
      message: "User created successfully",
      data: {
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        phone: user.phone,
      },
    };
  }
}

export default new AdminService();
