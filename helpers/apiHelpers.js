const { ValidationError, WrongParametersError } = require('./errors');
const { isValidObjectId } = require('mongoose');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(new ValidationError(`${contactId} is not correct`));
  }
  next();
};

const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const notFoundError = (_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError || error instanceof WrongParametersError)
    return res.status(error.status).json({ message: error.message });
  res.status(500).json({ message: error.message });
};

const throwParameterError = id => {
  throw new WrongParametersError(`Mistake, no contact with id: ${id}`);
};

module.exports = {
  isValidId,
  asyncWrapper,
  notFoundError,
  errorHandler,
  throwParameterError,
};
