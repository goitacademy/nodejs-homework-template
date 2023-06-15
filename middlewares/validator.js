const { HttpError } = require("../helpers");

const validator = (objectStructure) => {
  const func = (req, res, next) => {
    const { error } = objectStructure.validate(req.body);
    if (error) {
      next(HttpError(400, `missing field${error.message}`));
    }
    next();
  };
  return func;
};
module.exports = validator;
