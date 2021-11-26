const Contact = require("../../models/contacts");
const addContact = async ({ name, email, phone }) => {
  const result = new Contact({ name, email, phone });
  await result.save();
  return result;
};

module.exports = addContact;
