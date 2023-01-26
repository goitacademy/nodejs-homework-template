const { Contacts } = require("../../models/contact.js");

// GET /api/contacts

async function getAllContacts(req, res, next) {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const contactsList = await Contacts.find({}).skip(skip).limit(limit);
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllContacts;
