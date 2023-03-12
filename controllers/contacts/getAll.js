const contactsOperation = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
    message: "Contacts list is done",
  });
};

module.exports = getAll;
