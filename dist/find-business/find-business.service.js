"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindBusinessService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
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
};
let FindBusinessService = class FindBusinessService {
    async getClearest(dto) {
        const validate = ids[dto.area];
        if (!validate)
            throw new common_1.HttpException('Данного района не существует, проверьте корректность введённых Вами данных.', common_1.HttpStatus.NOT_ACCEPTABLE);
        const clearest = await this.getBusiness(dto);
        await this.getParks(dto);
        return clearest;
    }
    async getBusiness(dto) {
        const businesses = await (0, node_fetch_1.default)(`https://spb-classif.gate.petersburg.ru/api/v2/datasets/219/versions/latest/data/513/?per_page=100`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2a2lkMDAwMDAwMDAwIiwiZXhwIjoxNjc2NDc0MDg1fQ.tNTKu3InAWAk1Vb0Ubip72WhUFla3BjDI0Co4C1eCuk',
                'Content-Type': 'application/json'
            }
        });
        const response = await businesses.json();
        const filter = response.results.filter((x) => x.district == dto.area);
        const zones = await filter.length;
        const landscapes = await this.getParks(dto);
        return Math.floor(landscapes / (landscapes + zones) * 100);
    }
    async getParks(dto) {
        const id = ids[dto.area];
        const parks = await (0, node_fetch_1.default)('https://ogs.gate.petersburg.ru/object/district/' + id, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2a2lkMDAwMDAwMDAwIiwiZXhwIjoxNjc2NDc0MDg1fQ.tNTKu3InAWAk1Vb0Ubip72WhUFla3BjDI0Co4C1eCuk',
                'Content-Type': 'application/json'
            }
        });
        const response = await parks.json();
        const checkLandscape = response.filter(x => x.contract_type.includes('озеленение'));
        return checkLandscape.length;
    }
};
FindBusinessService = __decorate([
    (0, common_1.Injectable)()
], FindBusinessService);
exports.FindBusinessService = FindBusinessService;
//# sourceMappingURL=find-business.service.js.map