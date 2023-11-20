import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import productsServices from '../../../src/services/products.services';
import { ordersFromDb } from '../../mocks/orders.mock';
chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { Sinon.restore(); });

  it('should list orders with product ids', async function() {
    const productSimulated = ordersFromDb.map((order) => OrderModel.build(order))
    Sinon.stub(OrderModel, 'findAll').resolves(productSimulated)
  
    const response = await chai.request(app).get('/orders')
    expect(response.status).to.be.equal(200)
  })
});
