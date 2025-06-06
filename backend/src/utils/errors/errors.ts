import { ERROR_MESSAGES, STATUS_CODES } from "./error.constants";
import { ICustomError } from "./error.types";

export class CustomError extends Error {
  public status: number;
  public code?: string;
  public data?: any;

  constructor({ message, status, code, data }: ICustomError) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor({ ...props }: { data: any }) {
    super({
      message: ERROR_MESSAGES.MANDATORY_FIELDS_MISSING,
      status: STATUS_CODES.BAD_REQUEST,
      ...props,
    });
  }
}

export class UnAuthorizedError extends CustomError {
  constructor({ ...props }: { data?: any }) {
    super({
      message: ERROR_MESSAGES.UNAUTHORIZED,
      status: STATUS_CODES.UNAUTHORIZED,
      ...props,
    });
  }
}
