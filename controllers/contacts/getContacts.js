const Contacts = require("../../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const result = await Contacts.find();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
