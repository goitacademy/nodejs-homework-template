const Contacts = require("../../models/contacts");

// get all Contacts
const getContacts = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const contacts = await Contacts.find({}).limit(limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
