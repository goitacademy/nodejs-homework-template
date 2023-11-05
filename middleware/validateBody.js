const { HTTPError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    let msg;
    switch (req.method) {
      case "PUT":
        msg = "missing fields";
        break;
      case "PATCH":
        msg = `missing field "favorite"`;
        break;
      default:
        msg = "missing required name field";
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HTTPError(msg, 400));
    }
    next();
  };
  return foo;
};
module.exports = { validateBody };
