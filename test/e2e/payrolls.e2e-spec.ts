import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PayrollsModule } from '../src/payrolls/payrolls.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const prefix = '/payrolls'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PayrollsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`${prefix}/upload (POST)`, () => {
    return request(app.getHttpServer())
      .post(`${prefix}/upload`)
      .attach('file', './sample-files/time-report-42.csv')
      .field('name', 'time-report-42.csv')
      .expect(201)
      .expect(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
