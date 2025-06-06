import { NextFunction, Request, Response } from "express";

const removeKeys = ["_id", "__v", "createdAt", "updatedAt"];

const massageResponseBody = (data: any) => {
  if (Array.isArray(data)) {
    data.map((d) => {
      massageResponseBody(d);
    });
  }

  Object.keys(data || {}).forEach((key: any) => {
    if (typeof data[key] !== "object") {
      if (removeKeys.includes(key)) {
        delete data[key];
      }
    } else {
      massageResponseBody(data[key]);
    }
  });

  return data;
};

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  // @ts-ignore
  res.send = function (body) {
    try {
      const parsedBody = JSON.parse(body);
      if (parsedBody?.data) {
        body = JSON.stringify({ data: massageResponseBody(parsedBody.data) });
      }
      originalSend.call(this, body);
    } catch (error) {
      console.log(error);
      originalSend.call(this, body);
    }
  };

  next();
};
