import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { timeReportBufferMock } from '../../test/__mocks/time-report.mock';
import { PayrollsController } from './payrolls.controller';
import { PayrollsService } from './payrolls.service';

describe('PayrollsController', () => {
  let controller: PayrollsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollsController],
      providers: [PayrollsService],
    }).compile();

    controller = module.get<PayrollsController>(PayrollsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should process the input file', async () => {
      const employeeId = faker.datatype.number();

      const file = {
        originalname: `time-report-${employeeId}.csv`,
        buffer: timeReportBufferMock()
      } as Express.Multer.File;

      const result = await controller.uploadFile(file);

      expect(result).toBe(true);
    });

    it('should not process if file is empty', async () => {
      const file = {} as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });

    it('should not process if the name is not correct', async () => {
      const employeeId = faker.datatype.number();

      const file = {
        originalname: `timeReport${employeeId}.csv`,
        buffer: timeReportBufferMock()
      } as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });

    it('should not process if the buffer is not filled / file is empty', async () => {
      const employeeId = faker.datatype.number();

      const file = {
        originalname: `time-report-${employeeId}.csv`,
        buffer: null
      } as Express.Multer.File;

      const call = controller.uploadFile(file);

      await expect(call).rejects.toThrow(Error);
    });
  });
});
