import { Router } from "express";
import employeeController from "./employee.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const setupEmployeeRoutes = (app: Router) => {
  const employeeRouter = Router();
  app.use("/employee", employeeRouter);

  employeeRouter.post("/add", employeeController.createEmployee);
  employeeRouter.get("/", AuthMiddleware, employeeController.getEmployeeDetail);
  employeeRouter.get(
    "/hierarchy",
    AuthMiddleware,
    employeeController.getEmployeeHierarchy
  );
  employeeRouter.get(
    "/team-members",
    AuthMiddleware,
    employeeController.getTeamMembers
  );
};

export default setupEmployeeRoutes;
