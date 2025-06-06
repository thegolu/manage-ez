import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
    index: true,
  },
  dob: { type: Date, default: null },
  employeeId: { type: String, required: true, unique: true, index: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  designation: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Employee", employeeSchema);
