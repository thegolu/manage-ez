import { Router } from "express";
import adminController from "./admin.controller";


const setupAdminRoutes = (app: Router) => {
  const adminRouter = Router();
  app.use("/admin", adminRouter);

  adminRouter.post("/create-user", adminController.createAdminUser);
};

export default setupAdminRoutes;
