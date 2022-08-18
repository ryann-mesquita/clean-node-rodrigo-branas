import OrderRepository from "../../../domain/repository/OrderRepository";
import Order from "../../../domain/entity/Order";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];

    constructor () {
        this.orders = [];
    }

    save(order: Order): Promise<void> {
        this.orders.push(order);
        return Promise.resolve();
    }

}