import { ApiProperty } from '@nestjs/swagger';

class PayPeriod {
  @ApiProperty()
  startDate: string; // eg. "2020-01-01"

  @ApiProperty()
  endDate: string; // eg. "2020-01-15"
}

class EmployeeReport {
  @ApiProperty()
  employeeId: string; // "1"

  @ApiProperty({ type: PayPeriod })
  payPeriod: PayPeriod;

  @ApiProperty()
  amountPaid: string; // e.g. $300.00
}

class EmployeeReports {
  @ApiProperty({ type: [EmployeeReport] })
  employeeReports: EmployeeReport[]
}

export class PayrollReportDto {
  @ApiProperty()
  payrollReport: EmployeeReports;
}
