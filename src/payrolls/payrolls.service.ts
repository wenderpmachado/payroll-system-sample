import { Injectable } from '@nestjs/common';
import { parseTimeReportBufferToArray } from './utils/parse-time-report-buffer-to-array';

@Injectable()
export class PayrollsService {
  async handleUploadFile(fileName: string, fileBuffer: Buffer) {
    const array = await parseTimeReportBufferToArray(fileBuffer);
  }
}
