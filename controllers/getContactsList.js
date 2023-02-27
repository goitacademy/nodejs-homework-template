const { listContacts } = require("../models/contacts");
const { Contacts } = require("../db/collections");

const getContactsList = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = {
  getContactsList,
};
