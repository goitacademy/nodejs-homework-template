const ContactsService = require("../../services/contacts/contacts");

const getlistContacts = async (req, res) => {
  const contacts = await ContactsService.getAll(req.query, req.user);
  res.json({ status: "success", code: 200, payload: { ...contacts } });
};

module.exports = {
  getlistContacts,
};
