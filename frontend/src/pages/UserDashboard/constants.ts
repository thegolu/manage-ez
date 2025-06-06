import {
  PersonRemoveOutlined,
  SurfingOutlined,
  PendingActionsOutlined,
  Hail,
  EditCalendar,
  AccountBox,
  Group,
} from "@mui/icons-material";
import { eRoutes } from "../../enum/eRoutes";

export const dashboardData = [
  {
    title: "Month Absents",
    icon: PersonRemoveOutlined,
    value: 9,
    bgColor: "#F6DCD4",
    iconColor: "#F8784E",
  },
  {
    title: "Leaves Balance",
    icon: SurfingOutlined,
    value: 9,
    bgColor: "#f7e8ce",
    iconColor: "#FFB530",
  },
  {
    title: "Pending Leaves",
    icon: PendingActionsOutlined,
    value: 9,
    bgColor: "#D8E7F3",
    iconColor: "#61B1EA",
  },
];

export const suggestedForYou = [
  {
    title: "New Leave",
    icon: Hail,
    path: eRoutes.LEAVE,
    bgColor: "#F6DCD4",
    iconColor: "#F8784E",
  },
  {
    title: "My Attendance",
    icon: EditCalendar,
    path: eRoutes.ATTENDANCE,
    bgColor: "#f7e8ce",
    iconColor: "#FFB530",
  },
  {
    title: "My Profile",
    icon: AccountBox,
    value: 9,
    path: eRoutes.PROFILE,
    bgColor: "#D8E7F3",
    iconColor: "#61B1EA",
  },
  {
    title: "View Team",
    icon: Group,
    path: eRoutes.TEAM,
    bgColor: "#F6DCD4",
    iconColor: "#F8784E",
  },
];
