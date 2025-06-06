import { Request, Response } from "express";
import authService from "../auth/auth.service";
import employeeService from "../employee/employee.service";
import leaveService from "./leave.service";
import { IApplyLeavePayload } from "./leave.types";

class LeaveController {
  /**
   * @description Get leave balance
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getLeaveBalance(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const employee = await employeeService.getEmployeeDetail(employeeId);
    const leaveBalance = await leaveService.getLeaveBalance(employee._id);

    res.status(200).json({ data: leaveBalance });
  }

  /**
   * @description Apply leave
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async applyLeave(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;
    const body = req.body as IApplyLeavePayload;
    // TODO: write proper validation for the request body
    const employee = await employeeService.getEmployeeDetail(employeeId);
    const leave = await leaveService.applyLeave(employee._id, body);

    res.status(200).json({ data: leave });
  }

  /**
   * @description Get leave history
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getLeaveHistory(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const employee = await employeeService.getEmployeeDetail(employeeId);
    const leaveHistory = await leaveService.getLeaveHistory(employee._id);

    res.status(200).json({ data: leaveHistory });
  }

  /**
   * @description Get leave requests
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async getLeaveRequests(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;
    const { reportees } = await employeeService.getEmployeeHierarchy(
      employeeId
    );

    const leavePromises = reportees.map(async (reportee) => {
      const leaveRequests = await leaveService.getPendingLeaves(reportee._id);
      return {
        employee: {
          user: reportee.user,
          employeeId: reportee.employeeId,
          department: reportee.department,
        },
        leaveRequests,
      };
    });

    const result = (await Promise.all(leavePromises)).filter(
      (leave) => leave.leaveRequests.length > 0
    );

    res.status(200).json({ data: result });
  }

  /**
   * @description Approve leave
   * @param req - Request object
   * @param res - Response object
   * @returns - Response object
   */
  async actionOnLeaveRequest(req: Request, res: Response): Promise<any> {
    // can be done by manager or admins
    const { employeeId } = req.user;
    const { leaveId, action } = req.body;

    const managerId = await employeeService.getEmployeeDetail(employeeId);

    const leave = await leaveService.actionOnLeaveRequest(
      leaveId,
      managerId._id,
      action
    );

    res.status(200).json({ data: leave });
  }
}

export default new LeaveController();
