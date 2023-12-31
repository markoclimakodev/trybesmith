import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({
  name,
  price,
  orderId,
}: ProductInputtableTypes): string | null {
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!orderId) return 'orderId is required';
  
  return null;
}

async function registerProduct(product: ProductInputtableTypes):Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  return responseService;
}

async function listAllProducts():Promise<ProductSequelizeModel[]> {
  const products = await ProductModel.findAll();
  return products;
}

async function getProductIds(orderId: number):Promise<number[]> {
  const products = await ProductModel.findAll({ where: { orderId } });
  return products.map((product) => product.dataValues.id);
}

export default {
  registerProduct,
  listAllProducts,
  getProductIds,
  
};