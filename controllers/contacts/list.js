const { listContacts } = require("../../models/contacts");

const list = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = list;