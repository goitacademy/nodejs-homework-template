const { listContacts } = require("../../model");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

module.exports = getContacts;
