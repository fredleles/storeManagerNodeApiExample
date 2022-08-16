const sinon = require('sinon');
const { expect } = require('chai');
const validate = require('../../../middlewares/validateProducts');

const res = {};
const next = sinon.stub().returns();

describe('Unit Tests to validate user input data for products', () => {
  describe('Method PUT', () => { 

    it('Test if a title with a length less than 5 is allowed', () => {
      const req = { body: { title: 'test' }, method: 'PUT' };
      const error = ({ code: 422, message: '\'title\' length must be at least 5 characters long'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if a sale_price with a value less than 0 is allowed', () => {
      const req = { body: { sale_price: -1 }, method: 'PUT' };
      const error = ({ code: 422, message: '\'sale_price\' must be greater than 0.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if a sale_price with a value equal 0 is allowed', () => {
      const req = { body: { sale_price: 0 }, method: 'PUT' };
      const error = ({ code: 422, message: '\'sale_price\' must be greater than 0.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if a sale_price with a string is allowed', () => {
      const req = { body: { sale_price: 'teste' }, method: 'PUT' };
      const error = ({ code: 422, message: '\'sale_price\' must be a number'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if a active_flag with a string is allowed', () => {
      const req = { body: { active_flag: 'teste' }, method: 'PUT' };
      const error = ({ code: 422, message: '\'active_flag\' must be the number 0 or 1.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if a active_flag with a value different of 0 and 1 is allowed', () => {
      const req = { body: { active_flag: 2 }, method: 'PUT' };
      const error = ({ code: 422, message: '\'active_flag\' must be the number 0 or 1.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if valid input is allowed', () => {
      const req = { body: { active_flag: 1, title: 'teste', sale_price: 10.50 }, method: 'PUT' };
      
      validate(req, res, next);
      expect(next.calledWith()).to.be.equal(true);
    });
  });

  describe('Method POST', () => {
    
    it('Test if it is allowed to create a product without a title', () => {
      const req = { body: { active_flag: 1 }, method: 'POST' };
      const error = ({ code: 400, message: '\'title\' is required.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
    
    it('Test if it is allowed to create a product without a sale_price', () => {
      const req = { body: { title: 'teste' }, method: 'POST' };
      const error = ({ code: 400, message: '\'sale_price\' is required.'});
      
      validate(req, res, next);
      expect(next.calledWith(error)).to.be.equal(true);
    });
  });
});