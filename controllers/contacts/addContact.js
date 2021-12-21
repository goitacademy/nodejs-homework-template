const contactsOperations = require("../../model/contacts");
const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
