import { Request, Response } from "express";
import employeeService from "../employee/employee.service";
import attendanceService from "./attendance.service";

class AttendanceController {
  async registerPunch(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const employee = await employeeService.getEmployeeDetail(employeeId);

    const attendance = await attendanceService.registerPunch(employee._id);

    res.status(200).json({
      data: attendance,
    });
  }

  async getAttendance(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;
    let { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
      endDate = new Date();
    }

    const employee = await employeeService.getEmployeeDetail(employeeId);

    const attendance = await attendanceService.getAttendance(
      employee._id,
      startDate,
      endDate
    );

    res.status(200).json({
      data: attendance,
    });
  }

  async getAbsentDays(req: Request, res: Response): Promise<any> {
    const { employeeId } = req.user;

    const employee = await employeeService.getEmployeeDetail(employeeId);

    const attendance = await attendanceService.getAbsentDays(employee._id);

    res.status(200).json({
      data: attendance,
    });
  }
}

export default new AttendanceController();
