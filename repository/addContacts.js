const Contact = require("../models/contacts");

const addContact = async (body) => {
  console.log(body);
  const result = await Contact.create(body);
  console.log(result);
  return result;
};

module.exports = {
  addContact,
};
