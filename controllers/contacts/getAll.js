const { contactsOperations } = require("../../model/contacts");

const getAll = async (res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({ status: "success", code: 200, payload: contacts });
};

module.exports = getAll;
