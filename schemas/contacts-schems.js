const Joi = require("joi");

const addContactChema = Joi.object({
  name: Joi.string().required().messages({ "any required": `"gghhh"` }), // 1-09 //
  email: Joi.string().required().messages({ "any required": `"gghhh"` }),
  phone: Joi.string().required().messages({ "any required": `"gghhh"` }),
});
module.exports = {
  addContactChema,
};
