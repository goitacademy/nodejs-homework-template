const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
