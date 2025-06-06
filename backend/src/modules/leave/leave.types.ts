import mongoose from "mongoose";

export interface IApplyLeavePayload {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export enum LEAVE_TYPE {
  SICK = "sick",
  CASUAL = "casual",
}

interface ILeaves {
  [LEAVE_TYPE.SICK]?: {
    balance: number;
    carryForward: number;
  };
  [LEAVE_TYPE.CASUAL]?: {
    balance: number;
    carryForward: number;
  };
}

export interface ILeaveBalance {
  leaves?: ILeaves;
  year: number;
}

export interface ILeaveHistory {
  _id: mongoose.Types.ObjectId;
  leaveType: string;
  appliedOn: Date;
  startDate: Date;
  endDate: Date;
  status: string;
}
