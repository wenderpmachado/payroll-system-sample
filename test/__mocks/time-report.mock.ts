import * as faker from 'faker';
import { JOB_GROUPS } from '../../src/interfaces/time-report-data';

export function timeReportRowMock() {
  const date = faker.date.past();
  const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const hoursWorked = parseFloat(faker.datatype.float().toFixed(1));
  const employeeId = faker.datatype.number();
  const jobGroup = faker.random.arrayElement(JOB_GROUPS);

  const stringRow = `${formatedDate},${hoursWorked},${employeeId},${jobGroup}`;

  return {
    stringRow,
    date,
    formatedDate,
    hoursWorked,
    employeeId,
    jobGroup
  };
}

export function timeReportBufferMock() {
  const header = 'date,hours worked,employee id,job group';
  const { stringRow } = timeReportRowMock();
  const { stringRow: secondStringRow } = timeReportRowMock();
  const array = [header, stringRow, secondStringRow];

  return Buffer.from(array.join("\n"))
}
