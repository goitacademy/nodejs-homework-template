const { getContacts } = require("../models/contacts");
const { Contacts } = require("../db/collections");

const getContactsList = async (req, res) => {
  try {
    const {_id}=req.user

    const contacts = await getContacts(_id);

    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = {
  getContactsList,
};
