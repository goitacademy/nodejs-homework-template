const Contact = require("../model/contact");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
};

module.exports = listContacts;
