const { HTTPError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const msg =
      req.method === "PUT" ? "missing fields" : "missing required name field";
    const { error } = schema.validate(req.body);
    if (error) {
      next(HTTPError(msg, 400));
    }
    next();
  };
  return foo;
};
module.exports = validateBody;
