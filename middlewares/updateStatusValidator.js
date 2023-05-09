const Joi = require("joi");
const httpError = require("../helpers/httpError");

const validateStatusData = (req, __, next) => {
  const { error } = updateStatusValidate(req.body);

  if (error) {
    const fieldWithError = error.details[0].path[0];
    const errorType = error.details[0].type;
    switch (errorType) {
      case "any.required":
        next(httpError(400, `missing field ${fieldWithError}`));
        break;
      case "object.unknown":
        next(httpError(400, `${fieldWithError} is not allowed`));
        break;
      case "boolean.base":
        next(httpError(400, `${fieldWithError} must be a boolean`));
        break;
      default:
        break;
    }
    return;
  }
  next();
};

const updateStatusValidate = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = validateStatusData;
