import { timeReportBufferMock } from '../__mocks/time-report.mock';
import { parseBufferToArray } from '../../src/helpers/parse-buffer-to-array';

describe('parseBufferToArray', () => {
  it('should extract the data from a time report row', async () => {
    const timeReportBuffer = timeReportBufferMock();

    const result = await parseBufferToArray(timeReportBuffer);

    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(1);
  });
});
