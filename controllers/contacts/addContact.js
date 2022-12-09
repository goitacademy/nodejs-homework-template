const contacts = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
