import mongoose from "mongoose";
import { LeaveBalanceModel, LeaveModel } from "../../models/leave.model";
import {
  IApplyLeavePayload,
  ILeaveBalance,
  ILeaveHistory,
} from "./leave.types";

class LeaveService {
  /**
   * @description Get leave balance
   * @param employeeObjectId - Employee ID
   * @returns - Leave balance
   */
  async getLeaveBalance(
    employeeObjectId: mongoose.Types.ObjectId
  ): Promise<ILeaveBalance> {
    const leaveBalance = await LeaveBalanceModel.findOne(
      { employee: employeeObjectId },
      "leaves year"
    );

    return leaveBalance;
  }

  /**
   * @description Apply leave
   * @param employeeObjectId - Employee ID
   * @param leaveData - Leave data
   * @returns - Leave
   */
  async applyLeave(
    employeeObjectId: mongoose.Types.ObjectId,
    leaveData: IApplyLeavePayload
  ) {
    const leave = await LeaveModel.create({
      employee: employeeObjectId,
      appliedOn: new Date(),
      leaveType: leaveData.leaveType,
      status: "pending",
      reason: leaveData.reason || "",
      startDate: new Date(leaveData.startDate),
      endDate: new Date(leaveData.endDate),
    });

    return leave;
  }

  /**
   * @description Get leave history
   * @param employeeObjectId - Employee ID
   * @returns - Leave history
   */
  async getLeaveHistory(
    employeeObjectId: mongoose.Types.ObjectId
  ): Promise<ILeaveHistory[]> {
    const leaveHistory = await LeaveModel.find(
      {
        employee: employeeObjectId,
      },
      "leaveType appliedOn startDate endDate status"
    );

    return leaveHistory;
  }

  /**
   * @description Set leave balance
   * @param employeeObjectId - Employee ID
   * @returns - Leave balance
   */
  async setLeaveBalance(employeeObjectId: mongoose.Types.ObjectId) {
    const leaveBalance = await LeaveBalanceModel.create({
      employee: employeeObjectId,
      year: new Date().getFullYear(),
      leaves: {
        sick: {
          balance: 12,
          carryForward: 0,
        },
        casual: {
          balance: 12,
          carryForward: 0,
        },
      },
    });

    return leaveBalance;
  }

  /**
   * @description Get pending leaves
   * @param employeeObjectId - Employee ID
   * @returns - Pending leaves
   */
  async getPendingLeaves(employeeObjectId: mongoose.Types.ObjectId) {
    const pendingLeaves = await LeaveModel.find({
      employee: employeeObjectId,
      status: "pending",
    });

    return pendingLeaves;
  }

  /**
   * @description Action on leave request
   * @param leaveId - Leave ID
   * @param action - Action
   * @returns - Leave
   */
  async actionOnLeaveRequest(
    leaveId: mongoose.Types.ObjectId,
    actionBy: mongoose.Types.ObjectId,
    action: string
  ) {
    const leave = await LeaveModel.findByIdAndUpdate(leaveId, {
      status: action,
      actionBy: actionBy,
      actionDate: new Date(),
    });

    return leave;
  }
}

export default new LeaveService();
