"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./orders/entities/order.entity");
const driver_entity_1 = require("./orders/entities/driver.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1378',
    database: 'orders',
    synchronize: false,
    logging: true,
    entities: [order_entity_1.Order, driver_entity_1.Driver],
    migrations: ['./migrations/*.ts'],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
//# sourceMappingURL=data-source.js.map