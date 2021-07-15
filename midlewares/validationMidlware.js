const Joi = require("joi");

module.exports = {
    addContactValidation: (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(40).required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
        .pattern(new RegExp('[0-9\t]{3,15}$')).required(),
      });
  
      const validationResult = schema.validate(req.body);
      if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details});
      }
      next();
    },
  
    patchContactsValidation: (req, res, next) => {
        const schema = Joi.object({
          name: Joi.string().alphanum().min(3).max(40).required(),
          email: Joi.string().email().required(),
          phone: Joi.string()
          .pattern(new RegExp('[0-9\t]{3,15}$')).required(),
        });
        
      const validationResult = schema.validate(req.body);
      if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details});
      }
      next();
    },
  };
  