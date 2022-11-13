const Joi = require('joi');

const putContactsValidation = (
  req,
  res,
  next
) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .optional(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .optional(),

    phone: Joi.string()
      .alphanum()
      .min(4)
      .max(10)
      .optional(),
  });
  const validationResult = schema.validate(
    req.body
  );
  if (validationResult.error) {
    return res.json({
      message: 'Not found',
      status: validationResult.error.details,
      code: 400,
    });
  }
  next();
};

const postContactsValidation = (
  req,
  res,
  next
) => {
  const schema = Joi.object({
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(
    req.body
  );
  if (validationResult.error) {
    return res.json({
      message: 'missing required name field',
      status: validationResult.error.details,
      code: 400,
    });
  }
  next();
};

module.exports = {
  postContactsValidation,
  putContactsValidation,
};
