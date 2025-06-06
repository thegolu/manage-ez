import { Types } from "mongoose";

export interface IPopulateMetaData {
  isPopulateManager?: boolean;
  isPopulateDepartment?: boolean;
  isPopulateUser?: boolean;
}

export interface ICreateEmployeePayload {
  employeeId: string;
  email: string;
  name: string;
  dob: string;
  password: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  departmentCode: string;
  phone: string;
  profilePicture?: string;
  managerId?: string;
}

export interface ICreateEmployeeServiceResponse {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  dob: Date;
  employeeId: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: Types.ObjectId;
  manager: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser {
  _id: Types.ObjectId;
  email: string;
  name: string;
  profilePicture: string;
  phone?: string;
}

interface IDepartment {
  _id: Types.ObjectId;
  name: string;
  description: string;
  code: string;
}

interface IManager {
  _id: Types.ObjectId;
  user: IUser;
  dob: Date;
  employeeId: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: IDepartment;
  isActive: boolean;
}

export interface IEmployeeDetail {
  _id: Types.ObjectId;
  user: IUser;
  dob: Date;
  employeeId: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: IDepartment;
  manager?: IManager;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
