import * as faker from 'faker';
import { JOB_GROUPS } from '../interfaces/time-report-data';
import { extractTimeReportData } from './extract-time-report-data';

describe('extractTimeReportData', () => {
  it('should extract the data from a time report row', () => {
    const date = faker.date.past();
    const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hoursWorked = parseFloat(faker.datatype.float().toFixed(1));
    const employeeId = faker.datatype.number();
    const jobGroup = faker.random.arrayElement(JOB_GROUPS);

    const stringRow = `${formatedDate},${hoursWorked},${employeeId},${jobGroup}`;

    const result = extractTimeReportData(stringRow);

    expect(result).toBeTruthy();
    expect(result.hoursWorked).toBe(hoursWorked);
    expect(result.employeeId).toBe(employeeId);
    expect(result.jobGroup).toBe(jobGroup);
    expect(result.date.toDateString()).toBe(date.toDateString());
  });
});
