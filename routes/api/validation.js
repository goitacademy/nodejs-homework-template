const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(7).max(45).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().min(7).max(12).optional(),
}).min(1);

// const schemaStatusVaccinatedCat = Joi.object({
//   isVaccinated: Joi.boolean().required(),
// });

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.schemaCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.schemaUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
// module.exports.validateStatusVaccinatedCat = (req, _res, next) => {
//   return validate(schemaStatusVaccinatedCat, req.body, next);
// };
