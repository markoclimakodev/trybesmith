import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import { mockOrderList } from '../../mocks/orders.mock';
chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { Sinon.restore(); });

  it('should list orders with product ids', async function() {
    const simulatedOrders = mockOrderList.map((order) => OrderModel.build(order))
    Sinon.stub(OrderModel, 'findAll').resolves(simulatedOrders)
  
    const ordersResponse = await chai.request(app).get('/orders')
    expect(ordersResponse.status).to.be.equal(200)
  })
});
