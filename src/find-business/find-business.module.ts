import { Module } from '@nestjs/common';
import { FindBusinessController } from './find-business.controller';
import { FindBusinessService } from './find-business.service';

@Module({
  providers: [FindBusinessService],
  controllers: [FindBusinessController]
})
export class FindBusinessModule {}
