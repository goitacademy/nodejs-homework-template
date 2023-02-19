const { Contact } = require("../db/contactModel");

const addContactService = async (name, email, phone, favorite, owner) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  await contact.save();

  return contact;
};
module.exports = { addContactService };
