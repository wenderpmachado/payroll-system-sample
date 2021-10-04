import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PayrollsModule } from './payrolls/payrolls.module';

@Module({
  imports: [PayrollsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
