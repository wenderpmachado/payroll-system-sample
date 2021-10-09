import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IEmployeeReport, ITimeReportInfo } from 'src/interfaces/time-report-data';
import { PayrollsRepository } from '../../src/payrolls/payrolls.repository';
import { PayrollsService } from '../../src/payrolls/payrolls.service';
import { payrollsRepositoryMock } from '../../test/__mocks/payrolls-repository.mock';
import { timeReporNameMock } from '../../test/__mocks/time-report-name.mock';
import { timeReportBufferMock, timeReportRowMock } from '../../test/__mocks/time-report.mock';

describe('PayrollsService', () => {
  let service: PayrollsService;
  let payrollsRepository: PayrollsRepository;
  // let repositoryMock: MockType<Repository<TimeReport>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollsService,
        { provide: PayrollsRepository, useValue: payrollsRepositoryMock }
        // PayrollsRepository,
        // { provide: getRepositoryToken(TimeReport), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<PayrollsService>(PayrollsService);
    payrollsRepository = module.get<PayrollsRepository>(PayrollsRepository);
    // repositoryMock = module.get(getRepositoryToken(TimeReport));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleUploadFile', () => {
    it('should handle CSV uploaded file', async () => {
      jest.spyOn(payrollsRepository, 'isReportAlreadyProcessed')
          .mockResolvedValueOnce(false);

      jest.spyOn(payrollsRepository, 'create')
          .mockResolvedValueOnce(true);

      const { name } = timeReporNameMock();
      const buffer = timeReportBufferMock();

      const result = await service.handleUploadFile(name, buffer);

      expect(result).toBeTruthy();
    });

    it('should not handle the CSV if the report was already processed', async () => {
      jest.spyOn(payrollsRepository, 'isReportAlreadyProcessed')
          .mockResolvedValueOnce(true);

      const { name } = timeReporNameMock();
      const buffer = timeReportBufferMock();

      const call = service.handleUploadFile(name, buffer);

      await expect(call).rejects.toThrow(ConflictException);
    });
  });

  describe('getReports', () => {
    it('should get the reports', async () => {
      const { hoursWorked, employeeId, jobGroup, date } = timeReportRowMock();
      const timeReportInfo: ITimeReportInfo[] = [
        {
          content: { hoursWorked, employeeId, jobGroup, date }
        }
      ]
      jest.spyOn(payrollsRepository, 'findAll')
          .mockResolvedValueOnce(timeReportInfo);

      const result = await service.getReports();

      expect(result).toBeTruthy();
      expect(result.payrollReport.employeeReports.length).toBe(1);
    });

    it('should not get reports if the database is empty', async () => {
      jest.spyOn(payrollsRepository, 'findAll')
          .mockResolvedValueOnce([]);

      const emptyReport = {
        payrollReport: {
          employeeReports: [] as IEmployeeReport[]
        }
      }

      const result = await service.getReports();

      expect(result).toStrictEqual(emptyReport);
    });
  });
});
