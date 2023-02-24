const { listContacts } = require("../models");

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();

  res.json(contacts);
};

module.exports = getAllContacts;
