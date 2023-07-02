const { Contact } = require('../schema');

async function getAllContacts(_, res, next) {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllContacts };
