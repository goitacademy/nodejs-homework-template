const contacts = require("../../models/contacts");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.export = getAll;
