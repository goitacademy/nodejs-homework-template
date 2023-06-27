const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    return null;
  }
};

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();

//     const removedContact = contacts.find((contact) => contact.id === contactId);
//     if (removedContact) {
//       const updatedContacts = contacts.filter(
//         (contact) => contact.id !== contactId
//       );
//       await fs.writeFile(
//         contactsPath,
//         JSON.stringify(updatedContacts, null, 2)
//       );
//     }
//     return removedContact || null;
//   } catch (error) {
//     return null;
//   }
// };

const removeContact = async(id) => {
  try {
    const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
  } catch (error) {
    return null;
  }
  
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1) {
    return null;
  }
  contacts[index] = {contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
