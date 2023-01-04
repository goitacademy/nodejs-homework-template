const contacts = require("../../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    res.status(200).json(await contacts.listContacts());
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
