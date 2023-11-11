const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsFilePath = path.join(__dirname, 'contacts.json');

// Función para cargar los datos desde el archivo contacts.json
const loadContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // El archivo no existe, devuelve un array vacío
      return [];
    }
    console.error('Error loading contacts:', error.message);
    throw error;
  }
};

// Función para guardar los datos en el archivo contacts.json
const saveContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving contacts:', error.message);
    throw error;
  }
};

const listContacts = async () => {
  try {
    return await loadContacts();
  } catch (error) {
    console.error('Error listing contacts:', error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await loadContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error('Error getting contact by ID:', error.message);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    let contacts = await loadContacts();
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await saveContacts(contacts);
  } catch (error) {
    console.error('Error removing contact:', error.message);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await loadContacts();
    const newContact = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    contacts.push(newContact);
    await saveContacts(contacts);
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await loadContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      const updatedContact = {
        id: contactId,
        name: body.name,
        email: body.email,
        phone: body.phone,
      };

      contacts[index] = updatedContact;
      await saveContacts(contacts);
      return updatedContact;
    }

    return null; // Indica que no se encontró el contacto con el ID proporcionado
  } catch (error) {
    console.error('Error updating contact:', error.message);
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
