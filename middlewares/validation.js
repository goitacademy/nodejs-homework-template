const { ApiError } = require("../utils");

const isEmpty = require("lodash.isempty");

const contactValidation = (schema) => (req, _, next) => {
  const { body } = req;
  const { error } = schema.validate(body);

  if (req.method === "PUT" && isEmpty(body))
    next(ApiError(400, "Missing fields"));

  if (error) next(ApiError(400, "Missing required name field"));

  next();
};

module.exports = { contactValidation };
