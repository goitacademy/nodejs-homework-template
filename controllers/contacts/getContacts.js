const contacts = require('../../models/contacts');

//  GET /api/products

const getContacts = async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
