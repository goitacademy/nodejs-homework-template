const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");
const contactsSchema = require("../../schemas/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const resolve = await contacts.addContact(name, email, phone);

    return res.status(201).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
