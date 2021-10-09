import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { isEmpty } from 'lodash';
import { FileUploadDto } from './entities/file-upload.dto';
import { PayrollReportDto } from './entities/payroll-report.dto';
import { PayrollsService } from './payrolls.service';
import { isReportFileNameValid } from './utils/is-report-file-name-valid';

@ApiTags('payrolls')
@Controller('payrolls')
export class PayrollsController {
  constructor(private readonly payrollsService: PayrollsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Time Report File',
    type: FileUploadDto,
  })
  @ApiResponse({ status: 200, description: 'The file has been successfully processed and the report stored.'})
  @ApiResponse({ status: 400, description: 'Invalid file name OR Empty file.'})
  @ApiResponse({ status: 409, description: 'Report id X was already used.'})
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || isEmpty(file)) {
      throw new BadRequestException('File not uploaded');
    }

    const { originalname: name, buffer } = file;

    if (!isReportFileNameValid(name)) {
      throw new BadRequestException('Invalid file name.');
    }

    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('Empty file.');
    }

    return this.payrollsService.handleUploadFile(name, buffer);
  }

  @Get('reports')
  @ApiResponse({
    status: 200,
    description: 'Get reports ordered by employee id and the date',
    type: PayrollReportDto
  })
  async getReports() {
    return this.payrollsService.getReports();
  }
}
