const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
