export type TJobGroup = 'A' | 'B';

export const JOB_GROUPS_OPTIONS = {
  A: 'A' as TJobGroup,
  B: 'B' as TJobGroup,
}

export type TPayPeriod = 'a' | 'b';

export const PAY_PERIOD_OPTIONS = {
  FIRST_HALF: 'a' as TPayPeriod,
  SECOND_HALF: 'b' as TPayPeriod
}

export const JOB_GROUPS: TJobGroup[] = [
  JOB_GROUPS_OPTIONS.A,
  JOB_GROUPS_OPTIONS.B,
];

export const JOB_GROUPS_HOUR_VALUE = {
  [JOB_GROUPS_OPTIONS.A]: 20,
  [JOB_GROUPS_OPTIONS.B]: 30,
}

export interface ITimeReportData {
  date: Date;
  hoursWorked: number;
  employeeId: number;
  jobGroup: TJobGroup;
}

export interface ITimeReportInfo {
  content: ITimeReportData;
}

export class JobGroupEntity {
  _id: number;
  name: string;
  valueHour: number;
}

export interface IPayPeriod {
  startDate: Date | string; // eg. "2020-01-01"
  endDate: Date | string; // eg. "2020-01-15"
}

export interface IEmployeeReport {
  employeeId: string; // "1"
  payPeriod: IPayPeriod;
  amountPaid: string; // e.g. $300.00
}

export interface IPayrollReport {
  payrollReport: {
    employeeReports: IEmployeeReport[];
  }
}
