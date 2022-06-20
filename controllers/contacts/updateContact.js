const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const Joi = require("joi");

const contactsAddSchema = Joi.object({
  phone: Joi.string().regex(/^[0-9\d-]{3,10}$/).required(),
  name: Joi.string().min(3).max(20).required(), 
  email: Joi.string().email().lowercase().required(), 
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
