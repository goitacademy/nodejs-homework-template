const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const putContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^[0-9]{10,15}$/)
    .optional(),
});

const updateContactById = async (req, res, next) => {
  try {
    const { error } = putContactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing  fields`);
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!result) {
      res.status(404).json(`Not found`);
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
