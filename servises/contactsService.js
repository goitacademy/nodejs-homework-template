const { Contact } = require("../models/contactModels");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findOne({ _id: id });
  console.log(contact);
  return contact;
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const contact = new Contact({ name, email, phone, favorite });
  console.log(contact);
  await contact.save();
};

// const updateContact = (id, fields) => {
//   return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
// };

// const removeContact = (id) => {
//   return Contact.findByIdAndRemove({ _id: id });
// };

module.exports = {
  getContacts,
  getContactById,
  addContact,
  //   changePostById,
  //   deletePostById,
};
