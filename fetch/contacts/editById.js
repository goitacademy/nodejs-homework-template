const contactSchema = require("../../validation/contacts");
const { updateContact } = require("../../models/contacts");

const editById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
      if (error) {
      const errorMessages = error.details.map((detail) => {
        if (detail.type === 'any.required') {
          return `Missing required ${detail.context.key} field`;
        } else if (detail.type === 'string.base') {
          return `${detail.context.key} must be a string`;
        } else if (detail.type === 'string.empty') {
          return `${detail.context.key} cannot be empty`;
        }
        return `${detail.context.key} validation failed`;
      });

      res.status(400).json(errorMessages);
      return;
    }
  

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.json({
        message: "Not found"
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = editById;