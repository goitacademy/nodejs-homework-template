// const { HttpError } = require("../helpers");

const validateAddBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    }
    next();
  };
  return func;
};

const validateUpdBody = (schema) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const incorrectField = error.details[0].context.key;
      return res
        .status(400)
        .json({ message: `incorrect field  ${incorrectField} format` });
    }
    next();
  };
  return func;
};

module.exports = { validateAddBody, validateUpdBody };
