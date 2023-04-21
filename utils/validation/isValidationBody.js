const { addSchema } = require("./contactValidationSchema");

const isValidatiomBody = (req, res, next) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  next();
  return { error };
};

module.exports = isValidatiomBody;
