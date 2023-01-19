const Contacts = require("../../models/contacts");

// create new contact
const createNewContact = async (req, res, next) => {
  try {
    const newContact = await Contacts.create(req.query);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = createNewContact;
