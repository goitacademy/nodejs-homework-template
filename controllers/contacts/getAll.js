const { contactsOperations } = require("../../models");

const getAll = async (req, res) => {
  const allContacts = await contactsOperations.listContacts();
  res.json({ message: "success", contacts: allContacts });
};

module.exports = getAll;
