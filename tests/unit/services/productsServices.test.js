const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

describe('Unit tests for ProductsServices:', () => {
  describe('General tests of input/output from getById function', () => {
    let mockDB = [[]];
    sinon.stub(productsModel, 'dbGetById');

    after(() => {
      productsModel.dbGetById.restore();
    });

    it('test if the function does not allow a string for the parameter Id', async () => {
      const id = 'teste';
      const error = ({ code: 400, message: 'ID must be a number.'});
      productsModel.dbGetById.resolves(mockDB);

      const response = await productsServices.getById(id);
      expect(response).to.have.all.keys('code', 'message');
      expect(response.code).to.be.equals(error.code);
      expect(response.message).to.be.equals(error.message);
    });

    it('test if the function returns a error message when a ID is not found', async () => {
      const id = 10;
      const notFound = { code: 404, message: 'Product not found' };
      productsModel.dbGetById.resolves(mockDB);

      const response = await productsServices.getById(id);
      expect(response).to.have.all.keys('code', 'message');
      expect(response.code).to.be.equals(notFound.code);
      expect(response.message).to.be.equals(notFound.message);
    });
    
    it('test if the function returns the data from the DB when a product is found.', async () => {
      const id = 1;
      mockDB = [[{ id }]];
      productsModel.dbGetById.resolves(mockDB);
      
      const response = await productsServices.getById(id);
      expect(response.id).to.be.equal(id);
    });
  });

  describe('Search by Title service:', () => {
    let mockDB = [['product1', 'product2']];
    sinon.stub(productsModel, 'dbGetAll');
    sinon.stub(productsModel, 'dbQueryByTitle');

    after(() => {
      productsModel.dbGetAll.restore();
      productsModel.dbQueryByTitle.restore();
    });

    it('the parameter \'q\' is undefined', async () => {
      const q = undefined;
      productsModel.dbGetAll.resolves(mockDB);

      const response = await productsServices.queryByTitle(q);
      expect(response).to.be.a.lengthOf(2);
      expect(response[0]).to.be.eq('product1');
    });

    it('The search parameter does not hit any results', async () => {
      const q = 'test';
      productsModel.dbGetAll.resolves(mockDB);
      productsModel.dbQueryByTitle.resolves([[[]]]);

      const response = await productsServices.queryByTitle(q);
      expect(response).to.be.a.lengthOf(2);
      expect(response[0]).to.be.eq('product1');
    });

    it('The search parameter hit a result', async () => {
      const q = 'test';
      productsModel.dbQueryByTitle.resolves([[[{ title: 'product1' }]]]);

      const response = await productsServices.queryByTitle(q);
      expect(response).to.be.a.lengthOf(1);
      expect(response[0]).to.have.all.keys('title');
      expect(response[0].title).to.be.eq('product1');
    });
  });
});