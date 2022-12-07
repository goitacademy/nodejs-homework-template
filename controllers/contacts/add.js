const Joi = require("joi");
const { addContact } = require("../../models/contacts");

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const newContactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().alphanum(),
  email: Joi.string().min(4).max(255).required().email(),
  phone: Joi.string().min(4).max(20).pattern(phoneRegExp).required(),
});

const add = async (req, res, next) => {
  try {
    const { error } = newContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
