import * as faker from 'faker';
import { extractTimeReportId } from './extract-time-report-id';

describe('extractTimeReportId', () => {
  it('should extract the id number (name with extension)', () => {
    const idNumber = faker.datatype.number();
    const reportName = `time-report-${idNumber}.csv`;

    const result = extractTimeReportId(reportName);

    expect(result).toBe(idNumber);
  });

  it('should extract the id number (name without extension)', () => {
    const idNumber = faker.datatype.number();
    const reportName = `time-report-${idNumber}`;

    const result = extractTimeReportId(reportName);

    expect(result).toBe(idNumber);
  });
});
