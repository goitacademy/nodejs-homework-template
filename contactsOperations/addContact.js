const { Contact } = require("../models/index");

const addContact = async (body) => {
  const newContact = await Contact.create(body);

  return newContact;
};

module.exports = addContact;
