const contacts = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
