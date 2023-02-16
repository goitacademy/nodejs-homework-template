const { nanoid } = require("nanoid");
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(`${contactsPath}`);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // to find a contact by id we have to get all the contacts first and turn it into an object
  const data = await listContacts();

  // finding eligible id
  const result = data.find((contact) => contactId === contact.id);

  // if result is "undefind" ( = false) then we return "null" which is a standard database response
  // console.log(result)
  return result || null;
};

const removeContact = async (contactId) => {
  // getting all the contacts from a given JSON file
  const data = await listContacts();

  // using the func getContactById in order to get contact info for return
  const deletedContact = await getContactById(contactId);

  // if  getContactById(contactId) returns null we exit from the func because data.filter below will crush
  if (!deletedContact) return null;

  // immutable way to get a new array without deleted contact
  const newData = data.filter((contact) => contact.id !== contactId);

  // writing newData to the JSON
  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

  // check
  // console.log(deletedContact)

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  // getting all the contacts from a given JSON file
  const data = await listContacts();
  // console.log(data)

  const newContact = { name, email, phone, id: nanoid() };

  const dataNew = [...data, newContact];

  // !!!!!don't write anything to th DB before you TESTED everything inside the func!!!!!
  await fs.writeFile(contactsPath, JSON.stringify(dataNew, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  // finding conctact that has to be updated
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }

  // replacing changed fileds
  const result = { ...contact, ...body };

  // getting all the Contacts
  const contacts = await listContacts();

  // filtering all the contacts, deleting the one has to be updated in immutable way
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  // adding updated contact in immutable way
  const updatedContactsArray = [...filteredContacts, result];

  // writing updated array of Contacts to JSON database file
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsArray, null, 2)
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
