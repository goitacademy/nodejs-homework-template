const { listContacts } = require("../../models/contactsModel");

const getAll = async (req, res) => {
  const data = await listContacts();
  res.status(200).json(data);
};

module.exports = getAll;
