import { Router } from 'express';
import productsController from '../controllers/products.controller';
import validateProduct from '../middlewares/validateProduct';

const productsRouter = Router();

productsRouter.post('/products', validateProduct, productsController.register);
productsRouter.get('/products', productsController.listAllProducts);

export default productsRouter;