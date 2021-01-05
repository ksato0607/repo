import { Controller, Get, Post, Query } from '@nestjs/common';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
  constructor(private readonly service: MemoService) {}

  @Get()
  getMemoList() {
    return this.service.getMemoList();
  }

  @Post()
  addMemo(@Query() query: { name: string; description: string }) {
    console.warn(query);
    console.warn(query.name);
    console.warn(query.description);
    return this.service.addMemo(query.name, query.description);
  }
}
