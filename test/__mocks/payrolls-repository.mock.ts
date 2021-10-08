import { PayrollsRepository } from "../../src/payrolls/payrolls.repository";

// @ts-ignore
export const payrollsRepositoryMock: PayrollsRepository = {
  isReportAlreadyProcessed: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
}
