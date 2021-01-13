import { Module } from '@nestjs/common';
import { CatModule } from './cats/cats.module';

@Module({
  imports: [CatModule],
})
export class AppModule {}
