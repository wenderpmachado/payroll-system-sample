import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeReport } from './entities/time-report.entity';
import { PayrollsController } from './payrolls.controller';
import { PayrollsRepository } from './payrolls.repository';
import { PayrollsService } from './payrolls.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeReport])],
  controllers: [PayrollsController],
  providers: [
    PayrollsService,
    PayrollsRepository
  ]
})
export class PayrollsModule {}
