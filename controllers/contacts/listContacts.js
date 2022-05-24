const contactsOperation = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
};

module.exports = listContacts;
