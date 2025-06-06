export enum ATTENDANCE_STATUS {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  EARLY_OUT = "early_out",
  WEEKEND = "weekend",
  HOLIDAY = "holiday",
  LEAVE = "leave",
}

export const AttendanceMap = (hours: number) => {
  switch (true) {
    case hours > 6:
      return ATTENDANCE_STATUS.PRESENT;
    case hours > 4:
      return ATTENDANCE_STATUS.EARLY_OUT;
    default:
      return ATTENDANCE_STATUS.ABSENT;
  }
};
