const { HttpError } = require("../helpers");

const validateBody = (schema, method) => {
  const func = (req, res, next) => {
    if (method === "PATCH" && !req.body.favorite) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage = "";

      if (method === "POST" && error.details && error.details.length > 0) {
        const missingField = error.details[0].context.key;
        errorMessage = `missing required ${missingField} field`;
      }
      if (method === "PUT" && Object.keys(req.body).length === 0) {
        errorMessage = "missing fields";
      }

      next(HttpError(400, errorMessage));
    } else {
      next();
    }
  };

  return func;
};

module.exports = validateBody;
