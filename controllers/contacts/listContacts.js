const contactsOperations = require("../../models/contacts.js");

async function listContacts(req, res) {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
}

module.exports = listContacts;
