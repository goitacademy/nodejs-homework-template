const contactsBook = require("../../models/contacts.js");

const addContact = async (req, res, next) => {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const addNewContact = await contactsBook.addContact(newContact);

    res.status(201).json(addNewContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
