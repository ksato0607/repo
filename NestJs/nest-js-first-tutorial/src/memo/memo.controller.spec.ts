import { Test, TestingModule } from '@nestjs/testing';
import { MemoController } from './memo.controller';

describe('MemoController', () => {
  let controller: MemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoController],
    }).compile();

    controller = module.get<MemoController>(MemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
