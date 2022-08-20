import { Body, Controller, Post } from '@nestjs/common';
import { MyAreaDto } from 'src/dto/myarea.dto';
import { FindBusinessService } from './find-business.service';

@Controller('find-business')
export class FindBusinessController {

    constructor(private findService: FindBusinessService) {}

    @Post()
    async find(@Body() dto: MyAreaDto) {
        const clearest = await this.findService.getClearest(dto)
        return clearest;
    }
}
