import { TJobGroup, JOB_GROUPS_HOUR_VALUE } from "../../interfaces/time-report-data";

export function calculateWage(hoursWorked: number, jobGroup: TJobGroup) {
  const paidPerHour = JOB_GROUPS_HOUR_VALUE[jobGroup];

  return hoursWorked * paidPerHour;
}
