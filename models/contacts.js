const mongoose = require("mongoose");
const fs = require("fs").promises;

const listContacts = async () => {
  return await JSON.parse(await fs.readFile("models/contacts.json"));
};

const getContactById = async (contactId) => {
  const contact = (await listContacts()).find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    let contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex < 0) {
      throw error;
    }

    const removedContact = contacts.splice(contactIndex, 1);

    if (!removedContact) {
      throw error;
    }

    await fs.writeFile("models/contacts.json", JSON.stringify(contacts));

    return true;
  } catch (error) {
    return false;
  }
};

const addContact = async ({ name, email, phone, id }) => {
  const contacts = await listContacts();
  contacts.push({ name, email, phone, id });
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts));
};

const updateContact = async (contactId, data) => {
  console.log("updateContact");
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  console.log("idx: " + idx);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...data };
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts, null, 2)); // contactsPath
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
