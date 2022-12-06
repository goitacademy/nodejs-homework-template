const { listContacts } = require("../../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "success", data: contacts });
};

module.exports = getContacts;
