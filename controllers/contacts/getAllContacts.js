const contacts = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
