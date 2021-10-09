import { timeReportBufferMock } from "../../../test/__mocks/time-report.mock";
import { parseTimeReportBufferToArray } from "./parse-time-report-buffer-to-array";

describe('parseTimeReportBufferToArray', () => {
  it('should extract the data from a time report row', async () => {
    const timeReportBuffer = timeReportBufferMock();

    const result = await parseTimeReportBufferToArray(timeReportBuffer);
    const {date, employeeId, hoursWorked, jobGroup} = result[0];

    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(1);
    expect(date).toBeTruthy();
    expect(employeeId).toBeTruthy();
    expect(hoursWorked).toBeTruthy();
    expect(jobGroup).toBeTruthy();
  });
});
