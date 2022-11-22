const { WrongParametersError } = require("../helpers/errors");

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    next(new WrongParametersError(error.message));
  }
};

const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      console.log(error);
      next(
        new WrongParametersError("Error , Id doesn't match to database pattern")
      );
    }
  };
};

module.exports = { validateSchema, validateParams };
