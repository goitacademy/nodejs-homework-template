const { listContacts } = require("../models/contacts");

const getContactsList = async (res, req) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  getContactsList,
};
