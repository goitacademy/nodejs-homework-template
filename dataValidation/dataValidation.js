const Joi = require("joi");

const  addDataValid = (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(5).required(),
      });
      const valid = schema.validate(req.body);
      if (valid.error?.details[0].type === "any.required") {
        return res.status(400).json({ message: "missing required name field" });
      }
      if (valid.error) {
        return res.status(400).json(valid.error.details[0].message);
      }
      next();
    };
  
    const updateDataValid = (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(20),
        email: Joi.string().email(),
        phone: Joi.string().min(5),
      });
      const valid = schema.validate(req.body);
  
      if (valid.error) {
        return res.status(400).json(valid.error.details[0].message);
      }
      next();
    };

  module.exports = {
    addDataValid,
    updateDataValid
  };