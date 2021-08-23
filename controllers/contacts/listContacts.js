const contactsOperations = require("../../model/contacts");

const listContacts = async (_, res, next) => {
  try {
    const contactsList = await contactsOperations.listContacts();
    res.json({ contactsList });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
