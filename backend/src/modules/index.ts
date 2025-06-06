import { Router } from "express";
import setupLeaveRoutes from "./leave/leave.routes";
import setupEmployeeRoutes from "./employee/employee.routes";
import setupAuthRoutes from "./auth/auth.routes";
import setupAdminRoutes from "./admin/admin.routes";
import setupDepartmentRoutes from "./department/department.routes";
import setupAttendanceRoutes from "./attendance/attendance.routes";

const SetupRoutes = (router: Router) => {
  setupAdminRoutes(router);
  setupAuthRoutes(router);
  setupDepartmentRoutes(router);
  setupEmployeeRoutes(router);
  setupLeaveRoutes(router);
  setupAttendanceRoutes(router);
};

export default SetupRoutes;
