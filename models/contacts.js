const { Contact } = require("../model/contact");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  // const data = await Contact.find({ _id: id });
  return contact;
};

const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

const updateContacts = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};
// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);
//   return result || null;
// };
// const addContact = async (data) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...data,
//   };
//   contacts.push(newContact);
//   await updateById(contacts);
//   return newContact;
// };
// const updateContacts = async (id, data) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex((el) => el.id === id);
//   if (contactIndex === -1) {
//     return null;
//   }
// };
//   contacts[contactIndex] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   // await updateById(contacts);
//   return contacts[contactIndex];
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  // updateById,
};
