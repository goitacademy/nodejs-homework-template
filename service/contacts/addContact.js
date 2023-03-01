const { Contacts } = require("../../db/contacts");
const addContact = async (body) => {
  const data = await Contacts.create(body);
  return data;
};
module.exports = addContact;
