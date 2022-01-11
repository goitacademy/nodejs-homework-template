const { BadRequest } = require("http-errors");

const validation = (schema) => {
  const validationMiddleware = async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      const newError = new BadRequest(
        `Missing required field: ${error.message.replace(/"/g, " ")}`
      );
      next(newError);
    }
    next();
  };
  return validationMiddleware;
};

module.exports = validation;
