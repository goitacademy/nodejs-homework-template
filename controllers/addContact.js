const Joi = require("joi");

const contactsOperations = require("../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "created",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
