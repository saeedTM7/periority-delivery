"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const driver_entity_1 = require("./entities/driver.entity");
let OrderService = class OrderService {
    constructor(orderRepository, driverRepository) {
        this.orderRepository = orderRepository;
        this.driverRepository = driverRepository;
    }
    async createOrder(createOrderDto) {
        const order = this.orderRepository.create(createOrderDto);
        return await this.orderRepository.save(order);
    }
    async assignOrdersToDriver(driverId) {
        const driver = await this.driverRepository.findOne({
            where: { id: driverId },
            relations: ['orders'],
        });
        const orders = await this.orderRepository.find({
            order: { priority: 'DESC', deliveryTime: 'ASC' },
        });
        driver.orders = orders.slice(0, 5);
        await this.driverRepository.save(driver);
    }
    async generateDriverReport(driverId) {
        const driver = await this.driverRepository.findOne({
            where: { id: driverId },
            relations: ['orders'],
        });
        const totalCost = driver.orders.reduce((sum, order) => sum + order.cost, 0);
        const avgDeliveryTime = this.calculateAverageDeliveryTime(driver.orders);
        return {
            totalCost,
            avgDeliveryTime,
        };
    }
    calculateAverageDeliveryTime(orders) {
        if (orders.length === 0) {
            return 0;
        }
        const now = new Date();
        const totalTimeDiffInMs = orders.reduce((acc, order) => {
            const deliveryTime = new Date(order.deliveryTime).getTime();
            const timeDiff = deliveryTime - now.getTime();
            return acc + timeDiff;
        }, 0);
        const avgTimeInMs = totalTimeDiffInMs / orders.length;
        const avgTimeInHours = avgTimeInMs / (1000 * 60 * 60);
        return avgTimeInHours;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(driver_entity_1.Driver)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map