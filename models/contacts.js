const Contact = require("../services/schemas");

const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findOne({_id: contactId});
  return data;
};

const addContact = async (body) => {
  const data = await Contact.create(body);
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(
    {_id: contactId},
    {...body},
    {new: true}
  );
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove({_id: contactId});
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};

// const fs = require("fs/promises");
// const path = require("path");
// const {nanoid} = require("nanoid");

// const contactsPath = path.join(__dirname, "/contactsJSON.json");

// const listContacts = async () => {
//   const list = await fs.readFile(contactsPath, "utf8");
//   return JSON.parse(list);
// };

// const getContactById = async (Id) => {
//   const list = await listContacts();
//   const [item] = list.filter(({id}) => id === Id);
//   return item;
// };

// const removeContact = async (Id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(({index}) => index.toString() === Id);

//   if (index === -1) return null;
//   const update = contacts.splice(index, 1);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return update;
// };

// const addContact = async (body) => {
//   const {name, email, phone} = body;
//   const contacts = await listContacts();
//   const add = {
//     id: nanoid(5),
//     name,
//     email,
//     phone,
//   };

//   contacts.push(add);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
//   return add;
// };

// const updateContact = async (Id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(({id}) => id.toString() === Id);

//   if (index === -1) return null;
//   contacts[index] = {...contacts[index], ...body};

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
