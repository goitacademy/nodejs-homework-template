const contacts = require('../models/contacts');

async function getAllContacts(_, res, next) {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllContacts };
