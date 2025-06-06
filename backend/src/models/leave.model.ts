import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    index: true,
  },
  appliedOn: { type: Date, default: Date.now },
  leaveType: { type: String, required: true },
  status: { type: String, default: "pending" },
  reason: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  actionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  actionDate: { type: Date, default: null },
  actionReason: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const leaveBalanceModel = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    index: true,
  },
  year: { type: Number, required: true, default: new Date().getFullYear() },
  leaves: {
    sick: {
      balance: { type: Number, default: 12 },
      carryForward: { type: Number, default: 0 },
    },
    casual: {
      balance: { type: Number, default: 12 },
      carryForward: { type: Number, default: 0 },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const LeaveModel = mongoose.model("Leave", leaveSchema);
const LeaveBalanceModel = mongoose.model("LeaveBalance", leaveBalanceModel);

export { LeaveModel, LeaveBalanceModel };
