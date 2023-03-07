// const { listContacts } = require("../models");

const { Contact } = require("../models");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.json(contacts);
};

module.exports = getAllContacts;
