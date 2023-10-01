const Joi = require("joi");

const schema = {
  add: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  }).unknown(false),
  update: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
  })
    .or("name", "phone", "email")
    .unknown(false),
};

const getErrorMessage = (error, method) => {
  const errorTypes = error.details.map(({ type }) => type);
  const isEmailInvalid = errorTypes.some((type) => type === "string.email");
  const isMissingFields = errorTypes.some((type) => type === "any.required");
  const isStringBaseError = errorTypes.some((type) => type === "string.base");
  const missingFields = error.details.reduce((acc, { type, context }) => {
    if (type === "any.required") {
      acc.push(context.key);
    }
    return acc;
  }, []);

  if (isMissingFields) {
    switch (method) {
      case "add":
        return missingFields.length > 1
          ? `missing required fields: ${missingFields.join(", ")}`
          : `missing required ${missingFields[0]} field`;

      case "update":
        return "missing fields";

      default:
        break;
    }
  }

  if (isEmailInvalid) return "email is invalid";

  if (isStringBaseError) {
    const { message } = error.details.find(
      ({ type }) => type === "string.base"
    );
    return message;
  }
};

const addValidation = (req, res, next) => {
  const { error, value } = schema.add.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    const message = getErrorMessage(error, "add");
    res.status(400).json({ message });
    return;
  }
  req.data = value;
  next();
};

const updateValidation = (req, res, next) => {
  const { error, value } = schema.update.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    const message = getErrorMessage(error, "update");
    res.status(400).json({ message });
    return;
  }
  req.data = value;
  next();
};

module.exports = { addValidation, updateValidation };
