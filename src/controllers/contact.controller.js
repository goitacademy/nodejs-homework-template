const { listContacts } = require("../services/contact.service");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = { getAll };
