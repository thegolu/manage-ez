import { Router } from "express";
import departmentController from "./department.controller";

const setupDepartmentRoutes = (app: Router) => {
  const departmentRouter = Router();
  app.use("/department", departmentRouter);

  departmentRouter.post("/add", departmentController.createDepartment);
  departmentRouter.post("/update", departmentController.updateDepartment);
  departmentRouter.post("/delete", departmentController.deleteDepartment);
  departmentRouter.get("/all", departmentController.getAllDepartments);
};

export default setupDepartmentRoutes;
