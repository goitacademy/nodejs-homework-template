const { Contacts } = require("../../db/contacts/");
const listContacts = async () => {
  const data = await Contacts.find({});
  return data;
};
module.exports = listContacts;
