import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MyAreaDto } from 'src/dto/myarea.dto';
import fetch from 'node-fetch'

const ids = {
    'Адмиралтейский': 1,
    'Василеостровский': 2,
    'Выборгский': 3,
    'Калининский': 4,
    'Кировский': 5,
    'Колпинский': 6,
    'Красногвардейский': 7,
    'Красносельский': 8, 
    'Кронштадтский': 9,
    'Курортный': 10,
    'Московский': 11,
    'Невский': 12,
    'Петроградский': 13,
    'Петродворцовый': 14,
    'Приморский': 15, 
    'Пушкинский': 16,
    'Фрунзенский': 17,
    'Центральный': 18
}

@Injectable()
export class FindBusinessService {

    async getClearest(dto: MyAreaDto) {
        const validate = ids[dto.area]
        if(!validate) throw new HttpException('Данного района не существует, проверьте корректность введённых Вами данных.', HttpStatus.NOT_ACCEPTABLE)

        const clearest = await this.getBusiness(dto)
        await this.getParks(dto)

        return clearest;
    }

    async getBusiness(dto: MyAreaDto) {

        const businesses = await fetch(`https://spb-classif.gate.petersburg.ru/api/v2/datasets/219/versions/latest/data/513/?per_page=100`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2a2lkMDAwMDAwMDAwIiwiZXhwIjoxNjc2NDc0MDg1fQ.tNTKu3InAWAk1Vb0Ubip72WhUFla3BjDI0Co4C1eCuk',
                'Content-Type': 'application/json'
            }
        });

        const response = await businesses.json()
        const filter = response.results.filter((x: { district: string; }) => x.district == dto.area);

        const zones = await filter.length
        const landscapes = await this.getParks(dto)
        
        return Math.floor(landscapes/(landscapes + zones)*100)
    }

    async getParks(dto: MyAreaDto) {
        const id = ids[dto.area]

        const parks = await fetch('https://ogs.gate.petersburg.ru/object/district/' + id, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2a2lkMDAwMDAwMDAwIiwiZXhwIjoxNjc2NTY3MjAzfQ.5ygJ71J7Rv-JTdkXrRPPPVZqijPDvXgT3DsaiNhcF8A',
                'Content-Type': 'application/json'
            }
        })
        const response = await parks.json()
        const checkLandscape = response.filter(x => x.contract_type.includes('озеленение'))
        return checkLandscape.length
    }

}
