const contacts = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();

  if (result.length > 0) {
    return res.json(result);
  }

  res.status(204).json({ message: "No Content" });
};

module.exports = getAllContacts;
