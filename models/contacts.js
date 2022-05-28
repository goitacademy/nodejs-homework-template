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
  return JSON.parse(data).map((contact) => {
    if (contactId === contact.id) {
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
  const id = uuidv4();
  return [...data, { id, name, email, phone }];
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const data = await listContacts();

  const searchedContact = data.findIndex(contactId);
  console.log(searchedContact);

  data.forEach((contact, idx) => {
    if (contactId === contact.id) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
      return contact;
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
