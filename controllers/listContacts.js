const { readContacts } = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const result = await readContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
