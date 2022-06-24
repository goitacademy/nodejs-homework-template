const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const { contactAddScheme } = require("../../schemas/contacts");

const add = async (req, res, next) => {
  try {
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
