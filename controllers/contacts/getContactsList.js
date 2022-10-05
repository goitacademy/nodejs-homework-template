const contactsMethods = require("../../models/contacts")

const getContactList = async (_, res) => {
  const contacts = await contactsMethods.listContacts();
  res.status(200).json(contacts);
}

module.exports = getContactList;