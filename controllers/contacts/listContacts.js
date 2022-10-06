const contacts = require("../../models/contacts/index");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  //   console.log(result);
  res.json(result);
};

module.exports = listContacts;
