import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import leaveController from "./leave.controller";

const setupLeaveRoutes = (app: Router) => {
  const leaveRouter = Router();
  app.use("/leave", leaveRouter);

  leaveRouter.get("/balance", AuthMiddleware, leaveController.getLeaveBalance);
  leaveRouter.post("/apply", AuthMiddleware, leaveController.applyLeave);
  leaveRouter.get("/history", AuthMiddleware, leaveController.getLeaveHistory);
  leaveRouter.post(
    "/action",
    AuthMiddleware,
    leaveController.actionOnLeaveRequest
  );
  leaveRouter.get(
    "/leave-requests",
    AuthMiddleware,
    leaveController.getLeaveRequests
  );
};

export default setupLeaveRoutes;
