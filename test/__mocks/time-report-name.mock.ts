import * as faker from 'faker';

export function timeReporNameMock(withExtension = true) {
  const timeReportId = faker.datatype.number();

  return {
    name: `time-report-${timeReportId}${withExtension ? '.csv' : ''}`,
    timeReportId
  }
}
