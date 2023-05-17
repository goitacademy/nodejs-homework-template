const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().regex(/^[A-ZA][a-za]+ [A-ZA][a-za]+$/).required(), 
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\(\d{3}\)-\d{3}-\d{4}$/).required(),
  });

  module.exports={contactSchema,}