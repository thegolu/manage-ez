import { CustomError } from "../../utils/errors/errors";
import Department from "../../models/department.model";
import {
  ICreateDepartmentPayload,
  IDepartmentServiceResponse,
  IGetAllDepartmentsServiceResponse,
  IGetDepartmentByCodeServiceResponse,
  IUpdateDepartmentPayload,
  IUpdateDepartmentServiceResponse,
} from "./department.types";
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from "../../utils/errors/error.constants";

class DepartmentService {
  /**
   * @description Create a new department
   * @param {ICreateDepartmentPayload} payload
   */
  async createDepartment({
    code,
    name,
    description,
  }: ICreateDepartmentPayload): Promise<IDepartmentServiceResponse> {
    const isExisting = await Department.findOne({ code });
    if (isExisting) {
      throw new CustomError({
        message: ERROR_MESSAGES.DEPARTMENT_ALREADY_EXISTS,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const department = await Department.create({
      code,
      name,
      description,
      isActive: true,
    });
    return {
      code: department.code,
      name: department.name,
      description: department.description,
    };
  }

  /**
   * @description Get all departments
   */
  async getAllDepartments(): Promise<IGetAllDepartmentsServiceResponse[]> {
    const departments = await Department.find();

    return departments
      .filter((department) => department.isActive)
      .map((department) => ({
        code: department.code,
        name: department.name,
        description: department.description,
        updatedAt: department.updatedAt,
      }));
  }

  /**
   * @description Get a department by code
   * @param {string} code
   */
  async getDepartmentByCode(
    code: string
  ): Promise<IGetDepartmentByCodeServiceResponse> {
    const department = await Department.findOne({ code });
    if (!department || !department.isActive) {
      throw new CustomError({
        message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    return {
      _id: department._id,
      code: department.code,
      name: department.name,
      description: department.description,
      updatedAt: department.updatedAt,
    };
  }

  /**
   * @description Update a department
   * @param {IUpdateDepartmentPayload} payload
   * @returns {IUpdateDepartmentServiceResponse}
   */
  async updateDepartment({
    code,
    name,
    description,
    isActive,
  }: IUpdateDepartmentPayload): Promise<IUpdateDepartmentServiceResponse> {
    const department = await Department.findOne({ code });
    if (!department) {
      throw new CustomError({
        message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    department.name = name || department.name;
    department.description = description || department.description;
    department.isActive = isActive ?? department.isActive;
    await department.save();

    return {
      code,
      name: department.name,
      description: department.description,
    };
  }
}

export default new DepartmentService();
