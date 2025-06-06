import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors/errors";
import adminService from "./admin.service";

class AdminController {
  async createAdminUser(req: Request, res: Response): Promise<any> {
    const { email, password, profilePicture, name, phone } = req.body;
    if (!email || !password || !name || !phone) {
      throw new ValidationError({ data: req.body });
    }

    const adminUser = await adminService.createAdminUser({
      email,
      password,
      name,
      profilePicture,
      phone,
    });
    res.status(201).json(adminUser);
  }
}

export default new AdminController();
