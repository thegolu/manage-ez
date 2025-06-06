import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors/errors";
import employeeService from "./employee.service";
import { ICreateEmployeePayload } from "./employee.types";

class EmployeeController {
  /**
   * @description Create a new employee
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async createEmployee(req: Request, res: Response): Promise<any> {
    const body = req.body as ICreateEmployeePayload;
    if (!body) {
      throw new ValidationError({ data: body });
    }
    await employeeService.createEmployee(body);
    res.status(201).json({ data: {} });
  }

  /**
   * @description Get employee detail
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getEmployeeDetail(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const employee = await employeeService.getEmployeeDetail(employeeId);

    res.status(200).json({
      data: employee,
    });
  }

  /**
   * @description Get employee hierarchy
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getEmployeeHierarchy(req: Request, res: Response): Promise<any> {
    const { employeeId: userEmployeeId } = req.user;
    const { employeeId: targetEmployeeId } = req.query;

    const employee = await employeeService.getEmployeeHierarchy(
      (targetEmployeeId as string) || userEmployeeId
    );

    res.status(200).json({ data: employee });
  }

  /**
   * @description Get employee hierarchy
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getTeamMembers(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const teamMembers = await employeeService.getTeamMembers(employeeId);

    res.status(200).json({ data: teamMembers });
  }

  async getAllEmployees(req: Request, res: Response): Promise<any> {
    const { departmentCode } = req.body;
    const employees = await employeeService.getAllEmployees(departmentCode);

    res.status(200).json({ data: employees });
  }
}

export default new EmployeeController();
