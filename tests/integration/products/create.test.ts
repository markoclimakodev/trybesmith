import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { mockInputData, mockProduct } from '../../mocks/products.mock';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () { Sinon.restore(); });

 it('Should successfully register a product', async function() {
  const simulatedProduct = ProductModel.build(mockProduct)
  Sinon.stub(ProductModel, 'create').resolves(simulatedProduct)

  const registerProductResponse = await chai.request(app).post('/products').send(mockInputData)
  expect(registerProductResponse.status).to.be.equal(201)
  expect(registerProductResponse.body).to.have.keys(['id','name','price','orderId'])
})

it('Should throw error for invalid product data', async function() {
  const simulatedProduct = ProductModel.build(mockProduct)
  Sinon.stub(ProductModel, 'create').resolves(simulatedProduct)

  const invalidProductDataResponse = await chai.request(app).post('/products').send({})
  expect(invalidProductDataResponse.status).to.be.equal(400)
  expect(invalidProductDataResponse.body).to.deep.equal({
    message: "Name is required"
  });

})

})
