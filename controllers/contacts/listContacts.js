const { Contact } = require("../../models/contact.js");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  console.log(result);
  res.json(result);
};

module.exports = listContacts;