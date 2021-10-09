import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { version } from '../package.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const helloWorldMessage = `API Version: ${version}`;
    it('should return "API Version: {VERSION}"', () => {
      expect(appController.getHello()).toBe(helloWorldMessage);
    });
  });
});
