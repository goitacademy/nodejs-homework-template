const addSchema = require("./validateSchema");

const validateBody = (error, res) => {
  const missingField = error.details[0].context.label;
  return res.status(400).json({
    message: `missing required ${missingField} field`,
  });
};

const validateData = (body, req, res) => {
  if (!body.name && !body.email && !body.phone) {
    res.status(400).json({
      message: "missing fields",
    });
    return;
  }
  const { error } = addSchema.validate(req.body);
  if (error) {
    validateBody(error, res);
  }
};

module.exports = {
  validateBody,
  validateData,
};