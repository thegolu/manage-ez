import { Router } from "express";
import attendanceController from "./attendance.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const setupAttendanceRoutes = (app: Router) => {
  const attendanceRouter = Router();
  app.use("/attendance", attendanceRouter);

  attendanceRouter.post(
    "/punch",
    AuthMiddleware,
    attendanceController.registerPunch
  );

  attendanceRouter.post(
    "/",
    AuthMiddleware,
    attendanceController.getAttendance
  );

  attendanceRouter.get(
    "/get-absent-days",
    AuthMiddleware,
    attendanceController.getAbsentDays
  );
};

export default setupAttendanceRoutes;
