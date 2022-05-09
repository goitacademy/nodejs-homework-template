const fs = require("fs/promises");

const contactsPath = "./models/contacts.json";

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (contact) => Number(contact.id) === Number(contactId.id)
  );
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name: body.name,
    email: body.email,
    phone: String(body.phone),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (contact) => Number(contact.id) === Number(contactId.id)
  );
  if (!result) {
    return null;
  }

  const newConacts = contacts.map((contact) => {
    if (Number(contact.id) === Number(contactId.id)) {
      contact = {
        ...contact,
        ...body,
      };
    }
    return contact;
  });

  const response = {
    ...result,
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(newConacts));
  return response;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId.id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  !result || (await fs.writeFile(contactsPath, JSON.stringify(contacts)));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
