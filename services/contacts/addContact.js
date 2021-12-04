const Contact = require("../../models/contacts");
const addContact = async ({ name, email, phone, _id }) => {
  const result = new Contact({ name, email, phone, owner: _id });
  await result.save();
  return result;
};

module.exports = addContact;
