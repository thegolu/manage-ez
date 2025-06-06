import mongoose from "mongoose";
import attendanceModel from "../../models/attendance.model";
import {
  ERROR_MESSAGES,
  STATUS_CODES,
} from "../../utils/errors/error.constants";
import { CustomError } from "../../utils/errors/errors";
import { ATTENDANCE_STATUS, AttendanceMap } from "./attendance.types";

class AttendanceService {
  async registerPunch(employeeObjectId: mongoose.Types.ObjectId) {
    // find attendance for the day
    const attendance = await attendanceModel.findOne({
      employee: employeeObjectId,
      date: new Date().toISOString().split("T")[0],
    });

    if (attendance?.checkIn && attendance?.checkOut) {
      throw new CustomError({
        message: ERROR_MESSAGES.INVALID_OPERATION,
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
    if (!attendance?.checkIn) {
      // punch in
      const punchIn = await attendanceModel.create({
        employee: employeeObjectId,
        date: new Date().toISOString().split("T")[0],
        checkIn: new Date().getTime(),
        status: ATTENDANCE_STATUS.ABSENT,
      });

      return punchIn;
    }

    // punch out
    attendance.checkOut = new Date().getTime();
    attendance.totalHours =
      (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
    attendance.status = AttendanceMap(attendance.totalHours);

    await attendance.save();

    return attendance;
  }

  async getAttendance(
    employeeObjectId: mongoose.Types.ObjectId,
    startDate: string,
    endDate: string
  ) {
    const attendance = await attendanceModel.find({
      employee: employeeObjectId,
      date: {
        $gte: new Date(startDate).toISOString().split("T")[0],
        $lte: new Date(endDate).toISOString().split("T")[0],
      },
    });

    return attendance;
  }

  async getAbsentDays(employeeObjectId: mongoose.Types.ObjectId) {
    const attendance = await attendanceModel.find({
      employee: employeeObjectId,
      status: ATTENDANCE_STATUS.ABSENT,
    });

    return attendance;
  }
}

export default new AttendanceService();
