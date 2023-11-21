import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { mockProductList } from '../../mocks/products.mock';
chai.use(chaiHttp);


describe('GET /products', function () { 
  beforeEach(function () { Sinon.restore(); });

  it('should return a list of all products', async function () {
    const simulatedProducts = mockProductList.map((product) => ProductModel.build(product))
    Sinon.stub(ProductModel, 'findAll').resolves(simulatedProducts)

    const productListResponse = await chai.request(app).get('/products')
    expect(productListResponse.status).to.be.equal(200)
  })
});
