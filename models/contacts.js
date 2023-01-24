const fs = require("fs/promises");
const uId = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

const id = uId.v4();

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contactsArr = await listContacts(contactsPath);
  const wantedContact = contactsArr.find((el) => el.id === contactId);
  if (!wantedContact) return null;

  return wantedContact;
}

async function addContact(body) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const contactInfo = {
      id: id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    contactsArr.push(contactInfo);
    const updatedContactsArr = JSON.stringify(contactsArr, null, 4);
    await fs.writeFile(contactsPath, updatedContactsArr);

    return contactInfo;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const contactWithId = contactsArr.find((el) => el.id === contactId);
    if (!contactWithId) return null;

    const updatedContactsArr = contactsArr.filter((el) => el.id !== contactId);
    const stringifiedArr = JSON.stringify(updatedContactsArr, null, 4);
    await fs.writeFile(contactsPath, stringifiedArr);

    return contactWithId;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContact(contactId, body) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const contactUpdateInfo = {
      id: contactId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const isContact = await contactsArr.find(el => el.id === contactId);
    if(!isContact) return null;
    contactsArr.map(el => {
      if (el.id !== contactId) {
        return;
      }
      el.name = body.name;
      el.email= body.email;
      el.phone= body.phone;
    })

    const updatedContactsArr = JSON.stringify(contactsArr, null, 4);
    await fs.writeFile(contactsPath, updatedContactsArr);

    return contactUpdateInfo;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
