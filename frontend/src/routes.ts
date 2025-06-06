import Leaves from "./pages/Leaves";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import UserDashboard from "./pages/UserDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import { eRoutes } from "./enum/eRoutes";
import Attendance from "./pages/Attendance";
import Department from "./pages/Department";
import AddEmployee from "./pages/AddEmployee";

export const routes = [
  {
    path: eRoutes.LOGIN,
    component: Login,
  },
  // {
  //   path: eRoutes.DASHBOARD,
  //   component: UserDashboard,
  // },
  {
    path: eRoutes.LEAVE,
    component: Leaves,
  },
  {
    path: eRoutes.PROFILE,
    component: Profile,
  },
  {
    path: eRoutes.TEAM,
    component: Team,
  },
  {
    path: eRoutes.APPLY_LEAVES,
    component: ApplyLeave,
  },
  {
    path: eRoutes.ATTENDANCE,
    component: Attendance,
  },
  {
    path: eRoutes.DEPARTMENT,
    component: Department,
  },
  {
    path: eRoutes.ADD_EMPLOYEE,
    component: AddEmployee,
  },
];
