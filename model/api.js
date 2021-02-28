const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const getContact = contacts.find(
    (contact) => contact.id === Number(contactId)
  );
  return getContact;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const id = contacts.length + 1;
  const newContact = {
    id,
    ...body,
    ...(body ? {} : { body: false }),
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });
  return newContact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const deletedContact = contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );

  if (contacts.length === deletedContact.length) {
    return console.error(`Contact with ID ${contactId} not found`);
  }

  await fs.writeFile(contactsPath, JSON.stringify(deletedContact));
  console.log(`Contact with ID ${contactId} removed succesfully`);

  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const contact = await getContactById(contactId);
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === Number(contactId)) {
      return { ...contact, ...body };
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return { ...contact, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
