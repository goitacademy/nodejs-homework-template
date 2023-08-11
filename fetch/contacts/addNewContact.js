const contactSchema = require("../../validation/contacts");

const { addContact } = require("../../models/contacts");

const createNew = async (req, res, next) => {
    try {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
       if (error) {
      const errorMessages = error.details.map((detail) => {
        if (detail.type === 'any.required') {
          return `Missing required ${detail.context.key} field`;
        } else if (detail.type === 'string.base') {
          return `${detail.context.key} must be a string`;
        }
      });

      res.status(400).json({
        message: errorMessages.filter((msg) => msg).join(', ')
      });
      return;
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = createNew;