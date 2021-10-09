import { Test, TestingModule } from '@nestjs/testing';
import { IPayrollReport } from '../interfaces/time-report-data';
import { payrollsServiceMock } from '../../test/__mocks/payrolls-service.mock';
import { timeReporNameMock } from '../../test/__mocks/time-report-name.mock';
import { timeReportBufferMock } from '../../test/__mocks/time-report.mock';
import { PayrollsController } from './payrolls.controller';
import { PayrollsService } from './payrolls.service';

describe('PayrollsController', () => {
  let controller: PayrollsController;
  let service: PayrollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollsController],
      providers: [
        { provide: PayrollsService, useValue: payrollsServiceMock }
      ],
    }).compile();

    controller = module.get<PayrollsController>(PayrollsController);
    service = module.get<PayrollsService>(PayrollsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getReports', () => {
    it('should return reports', async () => {
      jest.spyOn(service, 'getReports')
          .mockResolvedValueOnce({} as IPayrollReport);

      const result = await controller.getReports();

      expect(result).toBeTruthy();
    });
  });

  describe('uploadFile', () => {
    it('should process the input file', async () => {
      const { name: originalname } = timeReporNameMock();

      const file = {
        originalname,
        buffer: timeReportBufferMock()
      } as Express.Multer.File;

      jest.spyOn(service, 'handleUploadFile')
          .mockResolvedValueOnce(true);

      const result = await controller.uploadFile(file);

      expect(result).toBe(true);
    });

    it('should not process if file is empty', async () => {
      const file = {} as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });

    it('should not process if the name is not correct', async () => {
      const { name } = timeReporNameMock();

      const file = {
        originalname: `${name.split('-').join('_')}`,
        buffer: timeReportBufferMock()
      } as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });

    it('should not process if the buffer is not filled / file is empty', async () => {
      const { name: originalname } = timeReporNameMock();

      const file = {
        originalname,
        buffer: null
      } as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });
  });
});
