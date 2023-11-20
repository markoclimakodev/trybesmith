import OrderModel from '../database/models/order.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';
import productsServices from './products.services';

async function listOrdersWithProductIds(): Promise<ServiceResponse<Order[]>> {
  const orders = await OrderModel.findAll();

  const ordersWithId = await Promise.all(orders.map(async (order) => {
    const { id, userId } = order.dataValues;
    const productId = await productsServices.getProductIds(order.dataValues.id);
    return {
      id,
      userId,
      productIds: productId,
    };
  }));
  
  return { status: 'SUCCESSFUL', data: ordersWithId };
}

export default {
  listOrdersWithProductIds,
};
