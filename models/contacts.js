const fs = require('fs/promises')
const contactsFilePath = './modules/contacts.json';

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error al listar contactos:', error);
    return [];
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(c => c.id === contactId);
    return contact;
  } catch (error) {
    console.error('Error al obtener contacto por ID:', error);
    return null;
  }
}

const removeContact = async (contactId) => {
  try {
    let contacts = await listContacts();
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    return false;
  }
}

const addContact = async (body) => {
  try {
    let contacts = await listContacts();
    const newContact = {
      id: generateId(),
      name: body.name,
      email: body.email,
      phone: body.phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('Error al agregar contacto:', error);
    return null;
  }
}

const updateContact = async (contactId, body) => {
  try {
    let contacts = await listContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    if (index !== -1) {
      contacts[index] = {
        id: contactId,
        name: body.name,
        email: body.email,
        phone: body.phone
      };
      await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    return null;
  }
}
const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
