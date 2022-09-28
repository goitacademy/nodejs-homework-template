const { Contact } = require('../../models/contact');

const getAllContacts = async (_, res) => {
  const result = await Contact.find({});
  // const result = await Contact.find({name: ...});
  // const result = await Contact.find({}, "name phone");
  // const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAllContacts;
