import { Router } from "express";
import authController from "./auth.controller";

const setupAuthRoutes = (app: Router) => {
  const authRouter = Router();
  app.use("/auth", authRouter);

  authRouter.post("/login", authController.login);
};

export default setupAuthRoutes;
