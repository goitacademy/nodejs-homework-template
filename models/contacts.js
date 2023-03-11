const fs = require("fs/promises");
const path = require("path");

const PATH = path.join(__dirname, "contacts.json");

const { v4: uuidv4 } = require("uuid");

const { schema } = require("../utils/contactsValidator");

const listContacts = async () => {
  const data = await fs.readFile(PATH);
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();

  const contact = contactsList.find((contact) => contact.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const newContactList = contactsList.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(PATH, JSON.stringify(newContactList));
  return newContactList;
};

const addContact = async (body) => {
  const contactsList = await listContacts();

  const { error, value } = schema(body);

  if (error) return next(new AppError(400, error.details[0].massage));

  const { name, email, phone } = value;

  try {
    const value = await schema.validateAsync({
      username: "abc",
      birth_year: 1994,
    });
  } catch (err) {}

  const newContact = { id: uuidv4(), name, email, phone };
  contactsList.push(newContact);

  await fs.writeFile(PATH, JSON.stringify(contactsList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const { name, email, phone } = body;

  // if (!name && !email && !phone) {
  // return
  // {"message": "missing fields"} 400}

  const idx = contactsList.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  const changedContact = contactsList[idx];

  if (name) changedContact.name = name;
  if (email) changedContact.email = email;
  if (phone) changedContact.phone = phone;

  contactsList[idx] = { id: contactId, name, email, phone };

  await fs.writeFile(PATH, JSON.stringify(contactsList));
  return contactsList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
