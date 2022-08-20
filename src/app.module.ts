import { Module } from '@nestjs/common';
import { FindBusinessModule } from './find-business/find-business.module';

@Module({
  imports: [FindBusinessModule],
  controllers: [],
  providers: []
})
export class AppModule {}
