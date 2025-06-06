import mongoose from "mongoose";
import { ACCESS_ROLES } from "../admin/admin.types";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginControllerResponse {
  email: string;
  name: string;
  profilePicture: string;
  phone?: string;
}

export interface ILoginServiceResponse {
  data: ILoginControllerResponse;
  extraData: {
    token: string;
    role: ACCESS_ROLES;
  };
}

export interface IRegisterPayload {
  email: string;
  phone: string;
  password: string;
  name: string;
  profilePicture?: string;
  isSendIdInResp?: boolean;
}

export interface IRegisterServiceResponse {
  _id?: mongoose.Types.ObjectId;
  email: string;
  name: string;
  profilePicture: string;
  phone: string;
}

export interface IGetUserByEmailServiceResponse {
  id: mongoose.Types.ObjectId;
  email: string;
  role: ACCESS_ROLES;
}
