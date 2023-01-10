const { ValidationError } = require("../helpers/errors");
const {
  postSchema,
  putSchema,
  patchSchema,
} = require("../helpers/validationІSchemas");

const validation = (schema) => {
  return (req, res, next) => {
  const validationResult = schema.validate(req.body);
    if (validationResult.error) {
    throw new ValidationError(validationResult.error.details);
  }
  next();
}
};

const postValidation = validation(postSchema);

const putValidation = validation(putSchema);

const patchValidation = validation(patchSchema);

module.exports = { postValidation, putValidation, patchValidation };




