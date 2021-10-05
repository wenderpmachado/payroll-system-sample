import { extractTimeReportDataFromString, extractTimeReportDataFromArray } from './extract-time-report-data';
import { timeReportRowMock } from '../../../test/__mocks/time-report.mock';

describe('extractTimeReportData', () => {
  it('should extract the data from a time report row', () => {
    const { stringRow, hoursWorked, employeeId, jobGroup, date } = timeReportRowMock();

    const result = extractTimeReportDataFromString(stringRow);

    expect(result).toBeTruthy();
    expect(result.hoursWorked).toBe(hoursWorked);
    expect(result.employeeId).toBe(employeeId);
    expect(result.jobGroup).toBe(jobGroup);
    expect(result.date.toDateString()).toBe(date.toDateString());
  });

  it('should extract the data from a time report row', () => {
    const { stringRow, hoursWorked, employeeId, jobGroup, date } = timeReportRowMock();
    const row = stringRow.split(',');

    const result = extractTimeReportDataFromArray(row);

    expect(result).toBeTruthy();
    expect(result.hoursWorked).toBe(hoursWorked);
    expect(result.employeeId).toBe(employeeId);
    expect(result.jobGroup).toBe(jobGroup);
    expect(result.date.toDateString()).toBe(date.toDateString());
  });
});
