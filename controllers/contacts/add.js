const contacts = require("../../models/contacts");

const { requestError } = require("../../helpers");

const { contactSchema } = require("../../schemas/contacts");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing required name field");
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;