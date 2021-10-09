import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { MongoDBConfigService } from './database/mongodb-config.service';
import { PayrollsModule } from './payrolls/payrolls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoDBConfigService,
    }),
    PayrollsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
