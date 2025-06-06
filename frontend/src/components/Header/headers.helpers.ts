import {
  AccountTree,
  CalendarMonth,
  Dashboard,
  HolidayVillage,
  LocalFireDepartment,
  Person,
  PersonAdd,
} from "@mui/icons-material";
import { eRoutes } from "../../enum/eRoutes";

export const drawerWidth = 240;

export const itemsToShow = [
  // {
  //   label: "Dashboard",
  //   icon: Dashboard,
  //   path: eRoutes.DASHBOARD,
  // },
  {
    label: "Profile",
    icon: Person,
    path: eRoutes.PROFILE,
  },
  {
    label: "Leave",
    icon: HolidayVillage,
    path: eRoutes.LEAVE,
  },
  {
    label: "Team",
    icon: AccountTree,
    path: eRoutes.TEAM,
  },
  {
    label: "Attendance",
    icon: CalendarMonth,
    path: eRoutes.ATTENDANCE,
  },
];

export const adminItemsToShow = [
  {
    label: "Department",
    icon: LocalFireDepartment,
    path: eRoutes.DEPARTMENT,
  },
  {
    label: "Add Employee",
    icon: PersonAdd,
    path: eRoutes.ADD_EMPLOYEE,
  },
];
