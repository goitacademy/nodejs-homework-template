const Joi = require("joi");

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.number().min(7).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
    return res.status(400).json({ message: `missing required ${validationResult.error.details[0].context.label} field`});
      
    }
 
    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),
      phone: Joi.number().optional(),
    });
    
    const validationResult = schema.validate(req.body);
    if (
      validationResult.error ||
      !req.body ||
      Object.keys(req.body).length === 0
    ) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
  },

  updFavContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validationResult = schema.validate(req.body);
    if (
      validationResult.error ||
      !req.body ||
      Object.keys(req.body).length === 0
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "missing field favorite"});
    }
    next();
  },

};