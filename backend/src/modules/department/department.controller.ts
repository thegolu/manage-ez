import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors/errors";
import departmentService from "./department.service";

class DepartmentController {
  /**
   * @description Create a new department
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async createDepartment(req: Request, res: Response): Promise<any> {
    const { name, description, code } = req.body;
    if (!code || !name || !description) {
      throw new ValidationError({ data: req.body });
    }

    const department = await departmentService.createDepartment({
      code,
      name,
      description,
    });
    return res.status(201).json({ data: department });
  }

  /**
   * @description Get all departments
   * @param _ - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getAllDepartments(_: Request, res: Response): Promise<any> {
    const departments = await departmentService.getAllDepartments();
    return res.status(200).json({ data: departments });
  }

  /**
   * @description Update a department
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async updateDepartment(req: Request, res: Response): Promise<any> {
    const { code, name, description } = req.body;
    if (!code || !name || !description) {
      throw new ValidationError({ data: req.body });
    }

    const department = await departmentService.updateDepartment({
      code,
      name,
      description,
    });
    return res.status(200).json({ data: department });
  }

  /**
   * @description Delete a department
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async deleteDepartment(req: Request, res: Response): Promise<any> {
    const { code } = req.body;
    const department = await departmentService.updateDepartment({
      code,
      isActive: false,
    });
    return res.status(200).json({ data: department });
  }
}

export default new DepartmentController();
