const fs = require("fs/promises");
const pathContacts = require("path");
const crypto = require("crypto");

const contactPath = pathContacts.join(__dirname, "..", "db", "contacts.json");

const getAllContactsService = async () => {
  const data = await fs.readFile(contactPath, "utf8");
  return JSON.parse(data);
};

const getContactByIdService = async (contactId) => {
  const data = await getAllContactsService();
  const find = data.find((id) => id === contactId);

  return find || null;
};

const addContactService = async (body) => {
  const data = await getAllContactsService();
  const contact = {
    id: crypto.randomUUID(),
    ...body,
  };

  data.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return contact;
};

const updateContactService = async (contactId, body) => {
  const data = await getAllContactsService();
  const contactIndex = data.findIndex((contact) => contact === contactId);

  if (contactIndex === -1) return;

  data[contactIndex] = {
    ...data[contactIndex],
    ...body,
  };

  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

  return data[contactIndex];
};

const removeContactService = async (contactId) => {
  const data = getAllContactsService();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return { message: "Not contact found with this identifier!" };
  }

  data.splice(index, 1);

  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));
  return index || null;
};

module.exports = {
  getAllContactsService,
  getContactByIdService,
  addContactService,
  updateContactService,
  removeContactService,
};
