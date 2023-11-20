import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { prodcutFromDb, validProductBody } from '../../mocks/products.mock';

chai.use(chaiHttp);

describe('ProductsService', function () {
  beforeEach(function () { Sinon.restore(); });

 it('should register a product', async function() {
  const productSimulated = ProductModel.build(prodcutFromDb)
  Sinon.stub(ProductModel, 'create').resolves(productSimulated)

  const response = await chai.request(app).post('/products').send(validProductBody)
  expect(response.status).to.be.equal(201)
  expect(response.body).to.have.keys(['id','name','price','orderId'])
})

})
