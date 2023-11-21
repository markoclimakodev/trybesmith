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

it('Should throw error if name field is missing', async function() {
  const simulatedProduct = ProductModel.build(mockProduct)
  Sinon.stub(ProductModel, 'create').resolves(simulatedProduct)

  const invalidProductDataResponse = await chai.request(app).post('/products').send({
    "price": "30 peças de ouros",
    "orderId": 5
  })
  expect(invalidProductDataResponse.status).to.be.equal(400)
})

it('Should throw error if price field is missing', async function() {
  const simulatedProduct = ProductModel.build(mockProduct)
  Sinon.stub(ProductModel, 'create').resolves(simulatedProduct)

  const invalidProductDataResponse = await chai.request(app).post('/products').send({
    "name": "Martelo de Thors",
    "orderId": 5
  })
  expect(invalidProductDataResponse.status).to.be.equal(400)
})

})
