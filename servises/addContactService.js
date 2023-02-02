const { Contact } = require("../db/contactModel");

const addContactService = async (name, email, phone) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();

  return contact;
};
module.exports = { addContactService };
