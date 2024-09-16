const contact = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const result = await contact.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
