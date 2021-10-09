import { calculateWage } from "../../../src/payrolls/utils/calculate-wage";
import { JOB_GROUPS_OPTIONS } from "../../../src/interfaces/time-report-data";

describe('calculateWage', () => {
  it('should calculate the wage to the job group A', () => {
    const jobGroup = JOB_GROUPS_OPTIONS.A;
    const hoursWorked = 30;

    const result = calculateWage(hoursWorked, jobGroup);

    expect(result).toBe(600);
  });

  it('should calculate the wage to the job group B', () => {
    const jobGroup = JOB_GROUPS_OPTIONS.B;
    const hoursWorked = 30;

    const result = calculateWage(hoursWorked, jobGroup);

    expect(result).toBe(900);
  });
});
