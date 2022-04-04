const contactMethod = require("../../models/contacts/index");

const { listContacts } = contactMethod.listContacts;

const getlistContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
};

module.exports = {
  getlistContacts,
};
