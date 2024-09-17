const contacts = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const resolve = await contacts.listContacts();
    return res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
