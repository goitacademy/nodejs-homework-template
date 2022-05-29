const contactsOperations = require('../../models/contacts');

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
