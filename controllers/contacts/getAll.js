const { Contact } = require("../../models/contacts");
const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, "name email phone favorite ");

  res.status(200).json({ data: { contacts } });
};

module.exports = getContacts;
