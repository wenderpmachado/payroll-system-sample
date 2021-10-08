import { ITimeReportData } from 'src/interfaces/time-report-data';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TimeReport {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  reportId: number;

  @Column()
  filename: string;

  @Column()
  content: ITimeReportData[];

  @Column()
  createdAt: Date;
}
