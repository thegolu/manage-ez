import { CustomError } from "../../utils/errors/errors";
import EmployeeModel from "../../models/employee.model";
import {
  ICreateEmployeePayload,
  ICreateEmployeeServiceResponse,
  IEmployeeDetail,
  IPopulateMetaData,
} from "./employee.types";
import AuthService from "../auth/auth.service";
import DepartmentService from "../department/department.service";
import { STATUS_CODES } from "../../utils/errors/error.constants";
import { ERROR_MESSAGES } from "../../utils/errors/error.constants";
import { Query } from "mongoose";
import { DESIGNATION } from "../../common/enums";
import leaveService from "../leave/leave.service";

class EmployeeService {
  private async populateWrapper(
    query: Query<any, any, any, any, any, any>,
    metaData: IPopulateMetaData
  ) {
    const managerPopulate = {
      path: "manager",
      select:
        "user dob employeeId gender maritalStatus designation department isActive",
      populate: [
        {
          path: "user",
          select: "name email phone profilePicture",
        },
        {
          path: "department",
          select: "name description code",
        },
      ],
    };

    const departmentPopulate = {
      path: "department",
      select: "name description code",
    };

    const userPopulate = {
      path: "user",
      select: "name email phone profilePicture",
    };

    const populateArray = [
      ...(metaData.isPopulateDepartment ? [departmentPopulate] : []),
      ...(metaData.isPopulateUser ? [userPopulate] : []),
      ...(metaData.isPopulateManager ? [managerPopulate] : []),
    ];

    return query.populate(populateArray);
  }

  /**
   * @description Create a new employee
   * @param {ICreateEmployeePayload} payload
   * @returns {Promise<ICreateEmployeeServiceResponse>}
   */
  async createEmployee({
    email,
    departmentCode,
    employeeId,
    ...props
  }: ICreateEmployeePayload): Promise<ICreateEmployeeServiceResponse> {
    let managerId = null;

    const isExistingEmployee = await EmployeeModel.findOne({ employeeId });
    if (isExistingEmployee) {
      throw new CustomError({
        message: ERROR_MESSAGES.EMPLOYEE_ALREADY_EXISTS,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    // check if department exists
    const department = await DepartmentService.getDepartmentByCode(
      departmentCode
    );

    // check if manager exists
    const manager = await EmployeeModel.findOne({
      employeeId: props.managerId,
    });
    if (!manager && props.designation !== DESIGNATION.CEO) {
      throw new CustomError({
        message: ERROR_MESSAGES.MANAGER_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    managerId = manager?._id;

    // create auth user
    const authUser = await AuthService.register({
      email,
      phone: props.phone,
      password: props.password,
      name: props.name,
      profilePicture: props.profilePicture,
      isSendIdInResp: true,
    });
    try {
      const employee = await EmployeeModel.create({
        user: authUser._id,
        dob: props.dob,
        employeeId,
        gender: props.gender,
        manager: managerId,
        maritalStatus: props.maritalStatus,
        designation: props.designation, // TODO: improve designation checks
        department: department._id,
      });

      // create leaves
      await leaveService.setLeaveBalance(employee._id);

      return employee;
    } catch (error) {
      await AuthService.deleteUserById(authUser._id);
      throw error;
    }
  }

  /**
   * @description Get employee detail
   * @param {string} employeeId
   * @returns {Promise<IEmployeeDetail>}
   */
  async getEmployeeDetail(employeeId: string): Promise<IEmployeeDetail> {
    const employee = await this.populateWrapper(
      EmployeeModel.findOne({ employeeId }),
      {
        isPopulateManager: true,
        isPopulateDepartment: true,
        isPopulateUser: true,
      }
    );

    if (!employee || !employee.isActive) {
      throw new CustomError({
        message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    return employee;
  }

  /**
   * Get employee hierarchy
   * @param employeeId - Employee ID
   * @returns {Promise<{ employee: IEmployeeDetail; reportees: IEmployeeDetail[] }>}
   */
  async getEmployeeHierarchy(
    employeeId: string
  ): Promise<{ employee: IEmployeeDetail; reportees: IEmployeeDetail[] }> {
    const employee = await this.populateWrapper(
      EmployeeModel.findOne({ employeeId }),
      {
        isPopulateManager: true,
        isPopulateDepartment: true,
        isPopulateUser: true,
      }
    );

    if (!employee || !employee.isActive || !employee._id) {
      throw new CustomError({
        message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    // Find all reportees to the employee
    const reportees = await this.populateWrapper(
      EmployeeModel.find({ manager: employee._id }),
      {
        isPopulateDepartment: true,
        isPopulateUser: true,
      }
    );

    return {
      employee,
      reportees,
    };
  }

  /**
   * Get team members
   * @param employeeId - Employee ID
   * @returns {Promise<IEmployeeDetail[]>}
   */
  async getTeamMembers(employeeId: string): Promise<IEmployeeDetail[]> {
    const employee = await EmployeeModel.findOne({ employeeId });
    if (!employee || !employee.isActive) {
      throw new CustomError({
        message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const teamMembers: IEmployeeDetail[] = await this.populateWrapper(
      EmployeeModel.find({ manager: employee.manager }, "user"),
      {
        isPopulateUser: true,
      }
    );

    return teamMembers.filter(
      (member) => member.isActive && member._id !== employee._id
    );
  }

  async getAllEmployees(departmentCode: string) {
    const department = await DepartmentService.getDepartmentByCode(
      departmentCode
    );

    if (!department) {
      throw new CustomError({
        message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    const employees = await EmployeeModel.find({
      department: department._id,
    });

    return employees;
  }
}

export default new EmployeeService();
