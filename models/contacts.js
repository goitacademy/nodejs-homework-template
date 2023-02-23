const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

async function listContacts() {
  const list = await fs.readFile(contactsPath, 'utf8');
  const listResult = JSON.parse(list);
  console.log(listResult);
  return listResult;
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactParse = JSON.parse(contacts);
  const contactResult = contactParse.find(
    (contact) => Number(contact.id) === Number(contactId));
  console.log(contactResult);
  return contactResult;
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactParse = JSON.parse(contacts);
  const contactResult = contactParse.findIndex(
    (contact) => Number(contact.id) === Number(contactId));
  
  contactParse.splice(contactResult, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactParse));
  const newList = await fs.readFile(contactsPath, "utf-8");
  console.log(JSON.parse(newList));
}

async function addContact({name, email, phone}) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactParse = JSON.parse(contacts);
  contactParse.push({
      id: "18",
      name,
      email,
      phone,
    });
  await fs.writeFile(contactsPath, JSON.stringify(contactParse));

}

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactParse = JSON.parse(contacts);
  const contactResult = contactParse.findIndex(
    (contact) => Number(contact.contactId) === Number(contactId));

  if (contactResult === -1) {
    return null;
  }
  contactParse[contactResult] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactParse, null, 2));
  return contactParse[contactResult];
  }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};