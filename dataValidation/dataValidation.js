const Joi = require("joi");

// module.exports = {
const  addDataValidation = (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(5).required(),
      });
      const validation = schema.validate(req.body);
      if (validation.error?.details[0].type === "any.required") {
        return res.status(400).json({ message: "missing required name field" });
      }
      if (validation.error) {
        return res.status(400).json(validation.error.details[0].message);
      }
      next();
    };
  
    const updateDataValidation = (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(20),
        email: Joi.string().email(),
        phone: Joi.string().min(5),
      });
      const validation = schema.validate(req.body);
  
      if (validation.error) {
        return res.status(400).json(validation.error.details[0].message);
      }
      next();
    };
  // };
  module.exports = {
    addDataValidation,
    updateDataValidation
  };