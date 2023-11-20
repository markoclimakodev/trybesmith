import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function register(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsServices.registerProduct({ name, price, orderId });

  res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function listAllProducts(_req: Request, res: Response) {
  const products = await productsServices.listAllProducts();
  res.status(200).json(products);
}

export default {
  register,
  listAllProducts,
};