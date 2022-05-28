const fs = require("fs").promises;
const contactPath = "./models/contacts.json";
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactPath, "utf8");
  if (!data) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`
    );
  }
  return JSON.parse(data).find((contact) => {
    if (contact.id === contactId || null) {
      return contact;
    }
  });
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactsWithoutRemovedContact = data.filter(
    (contact) => contact.id !== contactId
  );
  return contactsWithoutRemovedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  return [...data, { id: uuidv4(), name, email, phone }];
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contact = await getContactById(contactId);
  const updatedContact = { ...contact, ...body };

  data.forEach((contact, indexx) => {
    if (contact.id === contactId) {
      data[indexx] = updatedContact;
    }
  });
  await fs.writeFile(contactPath, JSON.stringify(data));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
