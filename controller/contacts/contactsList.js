const { listContacts } = require("../../models/contacts");

const contactsAll = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = contactsAll;
