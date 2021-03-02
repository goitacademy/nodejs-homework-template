const Joi = require('joi');

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
    .required(),
  password: Joi.string().min(1).max(20).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};
