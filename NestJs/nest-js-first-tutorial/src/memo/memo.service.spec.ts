import { Test, TestingModule } from '@nestjs/testing';
import { MemoService } from './memo.service';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoService],
    }).compile();

    service = module.get<MemoService>(MemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
