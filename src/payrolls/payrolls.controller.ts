import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { isEmpty } from 'lodash';
import { PayrollsService } from './payrolls.service';
import { isReportFileNameValid } from './utils/is-report-file-name-valid';

@Controller('payrolls')
export class PayrollsController {
  constructor(private readonly payrollsService: PayrollsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || isEmpty(file)) {
      throw new BadRequestException('File not uploaded');
    }

    const { originalname: name, buffer } = file;

    if (!isReportFileNameValid(name)) {
      throw new BadRequestException('Invalid file name');
    }

    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('Empty file');
    }

    this.payrollsService.handleUploadFile(name, buffer);

    return true;
  }
}
