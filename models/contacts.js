const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid")

const { mainModule } = require("process");

const contactsPath = path.resolve(__dirname, "contacts.json");


async function readContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  try {
    const contacts = await readContacts();
  return contacts;
  } catch (error) {
    console.log(error.message)
  }
  
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter((item) => item.id !== contactId);
  await writeContacts(updatedContacts);
  console.table(updatedContacts);
  return updatedContacts;
};

const addContact = async (body) => {
  const id = nanoid(3)
  const contacts = await readContacts()
  const newContact = { id, ...body }
  
  
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts()
  let [contact] = contacts.filter((item) => item.id === contactId);
  contact = {contactId, ...body}
  return contact
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
