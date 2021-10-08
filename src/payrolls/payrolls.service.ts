import { ConflictException, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { getMonth } from '../helpers/get-month';
import { IEmployeeReport, IPayrollReport, ITimeReportData, ITimeReportInfo, PAY_PERIOD_OPTIONS, TPayPeriod } from '../interfaces/time-report-data';
import { PayrollsRepository } from './payrolls.repository';
import { calculateWage } from './utils/calculate-wage';
import { extractTimeReportId } from './utils/extract-time-report-id';
import { generatesPayPeriod } from './utils/generates-pay-period';
import { parseTimeReportBufferToArray } from './utils/parse-time-report-buffer-to-array';

@Injectable()
export class PayrollsService {
  constructor(private readonly payrollsRepository: PayrollsRepository) {}

  async handleUploadFile(fileName: string, fileBuffer: Buffer) {
    const timeReportArray = await parseTimeReportBufferToArray(fileBuffer);

    return this.storeTimeReport(fileName, timeReportArray);
  }

  private async storeTimeReport(filename: string, content: ITimeReportData[]) {
    const reportId = extractTimeReportId(filename);

    // FIXME: TypeError: Cannot read property 'prototype' of undefined
    const isReportAlreadyProcessed = await this.payrollsRepository.isReportAlreadyProcessed(reportId);

    if (isReportAlreadyProcessed) {
      throw new ConflictException(`Report id ${reportId} was already used.`)
    }

    const timeReportCreated = await this.payrollsRepository.create({
      reportId,
      filename,
      content,
    })

    return timeReportCreated;
  }

  async getReports(): Promise<IPayrollReport> {
    const payrollReport = {
      payrollReport: {
        employeeReports: [] as IEmployeeReport[]
      }
    }

    const timeReportsInfo = await this.payrollsRepository.findAll();

    if (!isEmpty(timeReportsInfo)) {
      const reports: number[] = this.handleTimeReportsInfo(timeReportsInfo);

      const employeeReports: IEmployeeReport[] = this.handleEmployeeReport(reports);

      payrollReport.payrollReport = {
        employeeReports
      }
    }

    return payrollReport;
  }

  private handleTimeReportsInfo(timeReportsInfo: ITimeReportInfo[]): number[] {
    let reports = [] as number[];

    timeReportsInfo.forEach(timeReportInfo => {
      const { content } = timeReportInfo;
      const { employeeId, date, hoursWorked, jobGroup } = content;

      const year = date.getFullYear();
      const month = getMonth(date);
      const day = date.getDate();
      const payPeriod = day <= 15
        ? PAY_PERIOD_OPTIONS.FIRST_HALF
        : PAY_PERIOD_OPTIONS.SECOND_HALF;

      const index = `${year}-${month}-${payPeriod}-${employeeId}`;

      if (!reports[index]) {
        reports[index] = 0;
      }

      reports[index] += calculateWage(hoursWorked, jobGroup);
    });

    return reports;
  }

  private handleEmployeeReport(reports: number[]): IEmployeeReport[] {
    let employeeReport = [] as IEmployeeReport[];

    for (const index in reports) {
      const value = reports[index];

      const date = (index as unknown as string).split('-');
      const employeeId = date.pop();
      const payPeriod = date.pop() as TPayPeriod;

      const amountPaid = `$${value.toFixed(2)}`;

      employeeReport.push({
        employeeId,
        payPeriod: generatesPayPeriod(date.join('-'), payPeriod),
        amountPaid
      })
    }

    const employeeReportSorted = employeeReport.sort((a, b) => {
      return parseInt(a.employeeId) - parseInt(b.employeeId);
    })

    return employeeReportSorted
  }
}
