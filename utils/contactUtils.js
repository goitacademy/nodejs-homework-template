const path = require("path");
const fs = require("fs");

const contactsPath = path.join(__dirname, "../db", "contacts.json");

const listContacts = () => {
  const filePath = contactsPath;
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

const getById = (contactId) => {
  const contacts = listContacts();
  const filter = contacts.find((item) => item.id === contactId);
  return filter;
};

const addContact = (data) => {
  try {
    const { name, phone, email } = data;
    const contact = listContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updateContact = [...contact, newContact];
    const updateContactJson = JSON.stringify(updateContact, null, 2);
    fs.writeFileSync(contactsPath, updateContactJson);
    return true;
  } catch (error) {
    console.error("Error al agregar el contacto", error);
    return false;
  }
};
const removeContact = (contactId) => {
  try {
    const contacts = listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index !== -1) {
      contacts.splice(index, 1);
      const updateContacts = JSON.stringify(contacts, null, 2);
      fs.writeFileSync(contactsPath, updateContacts);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar el contacto", error);
    return false;
  }
};
const updateContact = (contactId, updatedFields) => {
  try {
    const contacts = listContacts();

    const index = contacts.findIndex((item) => item.id === contactId);

    if (index !== -1) {
      const updatedContact = { ...contacts[index], ...updatedFields };
      contacts[index] = updatedContact;
      const updatedContactsJson = JSON.stringify(contacts, null, 2);
      fs.writeFileSync(contactsPath, updatedContactsJson);

      return updatedContact;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar el contacto", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact
};
