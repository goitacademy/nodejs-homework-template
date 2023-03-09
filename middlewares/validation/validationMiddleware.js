const { joiSchemaRequired, joiSchemaOptional } = require("./validationSchema");

const validation = (req, res, next) => {
  const { body } = req;

  let validationResult;

  if (req.method === "POST") {
    validationResult = joiSchemaRequired.validate(body);
  }

  if (req.method === "PUT") {
    validationResult = joiSchemaOptional.validate(body);
  }

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};

module.exports = {
  validation,
};
