const contactsList = require("../../model/contacts/contactsList");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsList();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getContacts;
