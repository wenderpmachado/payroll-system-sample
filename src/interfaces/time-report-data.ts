export type TJobGroup = 'A' | 'B';

export const JOB_GROUPS: TJobGroup[] = ['A', 'B'];

export interface ITimeReportData {
  date: Date;
  hoursWorked: number;
  employeeId: number;
  jobGroup: TJobGroup;
}
