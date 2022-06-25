const Contact = require("../models/contacts");

const addContact = async (body, user) => {
  const result = await Contact.create({ ...body, owner: user.id });
  console.log(result);
  return result;
};

module.exports = {
  addContact,
};
