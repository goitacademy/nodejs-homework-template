const validateContact = require('./validation');
const {responseErrorOrNext} = require('../helpers');
const {BadRequest, NotFound} = require('http-errors');

const addContactValidation = async (req, res, next) => {
  const requiredFields = ['name', 'email', 'phone'];

  const {error} = validateContact(req.body, requiredFields);

  responseErrorOrNext(error, res, next);
};

const updateContactValidation = async (req, res, next) => {
  const {error} = validateContact(req.body);

  if (Object.keys(req.body).length === 0) {
    next(new BadRequest('Empty request\'s body'));
  }

  responseErrorOrNext(error, res, next);
};

const updateStatusContactValidation = async (req, res, next) => {
  const {error} = validateContact(req.body, ['favorite']);

  responseErrorOrNext(error, res, next);
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
