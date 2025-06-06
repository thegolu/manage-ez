export enum ACCESS_ROLES {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export interface ICreateAdminUserPayload {
  phone: string;
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
}
