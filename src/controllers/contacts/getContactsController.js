const { getContacts } = require("../../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  return res.json(contacts);
};

module.exports = { getContactsController };
