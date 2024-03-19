const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("./models/", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error al leer el archivo contacts.json:", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactFind = contacts.find((contact) => contactId === contact.id);
    return contactFind;
  } catch (error) {
    console.error("Error al leer el archivo contacts.json:", error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contactId === contact.id);

    if (index !== -1) {
      contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Proceso completado exitosamente.");
      return true;
    } else {
      console.log("No se encontró ningún contacto con el ID proporcionado.");
      return false;
    }
  } catch (error) {
    console.error("Error al leer el archivo contacts.json:", error);
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  const newObject = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    if (!contacts.find((contact) => contact.email === email)) {
      contacts.push(newObject);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Proceso completado exitosamente.");
    } else {
      console.log("Este email ya se encuentra registrado");
    }

    return newObject;
  } catch (error) {
    console.error("Error al leer el archivo contacts.json:", error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      throw new Error("Contact not found");
    }

    Object.assign(contacts[contactIndex], body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  } catch (error) {
    console.error("Error al leer el archivo contacts.json:", error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
