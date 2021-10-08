import * as faker from 'faker';
import { isReportFileNameValid } from './is-report-file-name-valid';

describe('isReportFileNameValid', () => {
  it('should return true if pass valid name', () => {
    const name = 'time-report-42.csv';

    const result = isReportFileNameValid(name);

    expect(result).toBe(true);
  });

  describe('it should return false', () => {
    it('if pass valid name, without extension', () => {
      const name = 'time-report-42';

      const result = isReportFileNameValid(name);

      expect(result).toBe(false);
    });

    it('random name', () => {
      const name = faker.name.findName();

      const result = isReportFileNameValid(name);

      expect(result).toBe(false);
    });

    it('missing report id', () => {
      const name = 'time-report.csv';

      const result = isReportFileNameValid(name);

      expect(result).toBe(false);
    });

    it('different format', () => {
      const name = 'timeReport42.csv';

      const result = isReportFileNameValid(name);

      expect(result).toBe(false);
    });
  });
});
