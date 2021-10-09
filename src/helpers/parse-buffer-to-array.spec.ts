import { timeReportBufferMock } from '../../test/__mocks/time-report.mock';
import { parseBufferToArray } from './parse-buffer-to-array';

describe('parseBufferToArray', () => {
  it('should extract the data from a time report row', async () => {
    const timeReportBuffer = timeReportBufferMock();

    const result = await parseBufferToArray(timeReportBuffer);

    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(1);
  });
});
