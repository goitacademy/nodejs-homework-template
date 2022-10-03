const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const {schema} = require("../../schemas/contacts");

const addNewContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
