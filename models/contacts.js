const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [contactById] = contacts.filter((item) => item.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToDelete = contacts.find((contact) => contact.id === contactId);
  if (!contactToDelete) {
    return;
  }
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(
    path.join(__dirname, "..", "models", "contacts.json"),
    JSON.stringify(updatedContacts)
  );
  return contactToDelete;
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "..", "models", "contacts.json"),
      JSON.stringify(contacts)
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    let contactToUpdate = await getContactById(contactId);
    contactToUpdate = {
      id: contactId,
      name,
      email,
      phone,
    };
    const updatedContactsList = contacts.map((contact) =>
      contact.id === contactId ? contactToUpdate : contact
    );
    await fs.writeFile(
      path.join(__dirname, "..", "models", "contacts.json"),
      JSON.stringify(updatedContactsList)
    );

    return contactToUpdate;
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
