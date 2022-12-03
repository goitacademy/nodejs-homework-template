const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const postContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10,15}$/)
    .required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = postContactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing required name field`);
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
