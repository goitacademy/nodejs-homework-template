const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
  // return contacts.slice(-limit);
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );

    return contactById || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactById = await contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contactById) {
    console.log("Requested contact (id) is not present in database");
    return;
  }

  const updatedContacts = await contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await writeContacts(updatedContacts);
};

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
}

const addContact = async (body) => {
  const id = nanoid();
  const { name, email, phone } = body;
  const contact = { id, name, email, phone };
  try {
    const contacts = await listContacts();
    contacts.push(contact);
    await writeContacts(contacts);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    const updatedContact = { ...contact, ...body };
    contacts[contactIndex] = updatedContact;
    writeContacts(contacts);
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
