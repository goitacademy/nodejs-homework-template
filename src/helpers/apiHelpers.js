const RequestError = require("./RequestError");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };

  return func;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

module.exports = {
  asyncWrapper,
  errorHandler,
  isEmpty,
}; 