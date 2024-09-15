const UpsErrors = require("../Helpers/UpsErrors");

const ValidBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next(UpsErrors(404, error.message));
    }
    next();
  };
  return func;
};

module.exports = ValidBody;
