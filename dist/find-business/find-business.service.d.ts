import { MyAreaDto } from 'src/dto/myarea.dto';
export declare class FindBusinessService {
    getClearest(dto: MyAreaDto): Promise<number>;
    getBusiness(dto: MyAreaDto): Promise<number>;
    getParks(dto: MyAreaDto): Promise<any>;
}
