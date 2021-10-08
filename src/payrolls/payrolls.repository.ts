import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ITimeReportInfo } from "src/interfaces/time-report-data";
import { MongoRepository } from "typeorm";
import { TimeReport } from "./entities/time-report.entity";

@Injectable()
export class PayrollsRepository {
  constructor(
    @InjectRepository(TimeReport)
    private readonly timeReportRepository: MongoRepository<TimeReport>,
  ) {}

  async isReportAlreadyProcessed(reportId: number): Promise<boolean> {
    const result = await this.timeReportRepository.findOne({ where: { reportId } });

    return !!result;
  }

  async create(timeReport: Omit<TimeReport, '_id' | 'createdAt'>) {
    await this.timeReportRepository.insertOne({
      ...timeReport,
      createdAt: new Date()
    })

    return true;
  }

  async findAll(): Promise<ITimeReportInfo[]> {
    const timeReportsInfo = await this.timeReportRepository.aggregate([
      {
        $unwind: '$content'
      },
      {
        $sort: {
          employeeId: 1,
          date: 1
        }
      }
    ]).toArray() as ITimeReportInfo[];

    return timeReportsInfo;
  }
}
