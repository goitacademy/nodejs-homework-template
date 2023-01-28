const { nanoid } = require("nanoid");
const path = require("path");
const { FSOperationsHelper } = require("@root/helpers");

const pathToContactsDB = path.join(__dirname, "contactsDB.json");
let contactsArray = null;

//MAIN
(async () => {
  FSOperationsHelper.init(pathToContactsDB);
  const contactsData = await FSOperationsHelper.readData();
  contactsArray = JSON.parse(contactsData);
})();

const listContacts = async () => contactsArray;

const getContactById = async (contactId) => {
  const [foundContact] = contactsArray.filter(
    (contact) => contact.id === contactId
  );

  return foundContact;
};

const addContact = async (contactData) => {
  const newContact = { id: nanoid(), ...contactData };

  contactsArray.push(newContact);
  await FSOperationsHelper.writeData(JSON.stringify(contactsArray, null, 2));

  return newContact;
};

const updateContact = async (contactId, newContactData) => {
  const contactIndex = contactsArray.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) return null;

  const oldContact = contactsArray[contactIndex];
  const safeNewContactData = newContactData;
  delete safeNewContactData.id;
  contactsArray[contactIndex] = { ...oldContact, ...safeNewContactData };
  await FSOperationsHelper.writeData(JSON.stringify(contactsArray, null, 2));

  return contactsArray[contactIndex];
};

const removeContact = async (contactId) => {
  const index = contactsArray.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [foundContact] = contactsArray.splice(index, 1);
  await FSOperationsHelper.writeData(JSON.stringify(contactsArray, null, 2));

  return foundContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
