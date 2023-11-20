import { Request, Response } from 'express';
import ordersServices from '../services/orders.services';

async function listAllOrders(_req: Request, res: Response) {
  const serviceResponse = await ordersServices.listOrdersWithProductIds();

  res.status(200).json(serviceResponse.data);
}

export default {
  listAllOrders,
};