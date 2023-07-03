const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
 const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  return contacts.slice(index, index + 1);
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === id);

  if (index === -1) {
    console.log("cant change element with such id");
    return null;
  }

  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (contactId) => {
   const contacts = await listContacts();
   const index = contacts.findIndex(({ id }) => id === contactId);

   if (index === -1) {
     return null;
   }
   const [result] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return result;
}





module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
