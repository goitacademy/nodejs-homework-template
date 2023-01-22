const { httpErrorsHandler } = require("@root/helpers");
const contactsOperations = require("@root/models/contacts");

async function getAllContacts(req, res, next) {
  const contacts = await contactsOperations.listContacts();

  res.status(200).json(contacts);
}

module.exports = {
  getAllContacts,
};
