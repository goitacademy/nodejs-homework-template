const service = require("../service");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    service.CheckByError(req.body === {}, 400, "missing required field");
    const { error } = schema.validate(req.body);

    service.CheckByError(error, 400, "missing required field");
    next();
  };

  return func;
};

module.exports = validateBody;
