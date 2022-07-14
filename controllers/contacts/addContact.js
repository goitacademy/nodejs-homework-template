const contacts = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(404, error.message);
    }
    console.log(error);
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
