const Contact = require("../../model/contact");
const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

module.exports = addContact;
