import { MyAreaDto } from 'src/dto/myarea.dto';
import { FindBusinessService } from './find-business.service';
export declare class FindBusinessController {
    private findService;
    constructor(findService: FindBusinessService);
    find(dto: MyAreaDto): Promise<number>;
}
