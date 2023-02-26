const {listContacts} = require("../models");

const listContactsController = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

module.exports = listContactsController;