import { PayrollsService } from "src/payrolls/payrolls.service";
import { PayrollsRepository } from "../../src/payrolls/payrolls.repository";

// @ts-ignore
export const payrollsServiceMock: PayrollsService = {
  getReports: jest.fn(),
  handleEmployeeReport: jest.fn(),
  handleTimeReportsInfo: jest.fn(),
  handleUploadFile: jest.fn(),
}
