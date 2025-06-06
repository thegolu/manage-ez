import { Types } from "mongoose";

export interface ICreateDepartmentPayload {
  code: string;
  name: string;
  description: string;
}

export interface IDepartmentServiceResponse {
  code: string;
  name: string;
  description: string;
}

export interface IGetAllDepartmentsServiceResponse {
  code: string;
  name: string;
  description: string;
  updatedAt: Date;
}

export interface IGetDepartmentByCodeServiceResponse {
  _id: Types.ObjectId;
  code: string;
  name: string;
  description: string;
  updatedAt: Date;
}

export interface IUpdateDepartmentPayload {
  code: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface IUpdateDepartmentServiceResponse {
  code: string;
  name: string;
  description: string;
}
