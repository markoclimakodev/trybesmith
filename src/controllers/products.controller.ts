import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function register(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsServices.registerProduct({ name, price, orderId });

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  register,
};