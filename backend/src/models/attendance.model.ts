import mongoose from "mongoose";
import { ATTENDANCE_STATUS } from "../modules/attendance/attendance.types";

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    index: true,
  },
  date: { type: String, required: true, index: true },
  status: {
    type: String,
    enum: Object.values(ATTENDANCE_STATUS),
    required: true,
    index: true,
  },
  checkIn: { type: Number, default: 0 },
  checkOut: { type: Number, default: 0 },
  totalHours: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Attendance", attendanceSchema);
