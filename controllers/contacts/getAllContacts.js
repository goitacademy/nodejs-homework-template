const contactsOperations = require("../../model/contacts");

const getAllContacts = async (_req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllContacts;
