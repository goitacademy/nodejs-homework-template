const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
// const dataValidator = require("../helpers/dataValidator");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

// Contact list

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

//  Update contacts

function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
}

// Update contacts by Id
async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContacts(contacts);

  console.log(
    contacts[index],
    chalk.greenBright("Contact was successfully updated!")
  );
  return contacts[index];
}
// Add contact

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const addedContact = { name: name, email: email, phone: phone, id: nanoid() };

  contacts.push(addedContact);
  await updateContacts(contacts);

  console.log(
    addedContact,
    chalk.greenBright("Contact was successfully added!")
  );
  return addedContact;
}

// Get contact by ID

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(chalk.redBright(`"Contact with id:${contactId} not found!"`));
    return null;
  }
  console.log(
    contactById,
    chalk.greenBright("Contact was successfully finded!")
  );

  return contactById;
}

// Remove contact

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(chalk.redBright(`Contact with id:${contactId} is not found!`));
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  updateContacts(newContacts);
  console.log(chalk.greenBright("Contact has been successfully deleted!"));
  return contactById;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
