const validateContact = require('./validation');
const {responseErrorOrNext} = require('../helpers');

const addContactValidation = async (req, res, next) => {
  const requiredFields = ['name', 'email', 'phone'];

  const {error} = validateContact(req.body, requiredFields);

  responseErrorOrNext(error, res, next);
};

const updateContactValidation = async (req, res, next) => {
  const {error} = validateContact(req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({message: 'Empty request\'s body'});
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
