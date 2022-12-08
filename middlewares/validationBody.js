const { requestError } = require("../helpers/api.helpers");

const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = { validationBody };
