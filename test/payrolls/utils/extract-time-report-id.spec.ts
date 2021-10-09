import { timeReporNameMock } from '../../../test/__mocks/time-report-name.mock';
import { extractTimeReportId } from '../../../src/payrolls/utils/extract-time-report-id';

describe('extractTimeReportId', () => {
  it('should extract the id number (name with extension)', () => {
    const { name: reportName, timeReportId } = timeReporNameMock();

    const result = extractTimeReportId(reportName);

    expect(result).toBe(timeReportId);
  });

  it('should extract the id number (name without extension)', () => {
    const { name: reportName, timeReportId } = timeReporNameMock(false);

    const result = extractTimeReportId(reportName);

    expect(result).toBe(timeReportId);
  });
});
