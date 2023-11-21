import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import { UserFromDb, validBodyLogin } from '../../mocks/auth.mock';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { Sinon.restore(); });

  it('Should sign in', async function() {
    const simulatedUser = UserModel.build(UserFromDb)
    Sinon.stub(UserModel, 'findOne').resolves(simulatedUser)

    const response = await chai.request(app).post('/login').send(validBodyLogin)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.key('token');
    
  })

});
