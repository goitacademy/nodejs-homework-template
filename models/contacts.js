const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  if (!allContacts) {
    return null;
  }
  return allContacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactByID = data.find((elem) => elem.id === contactId);
  if (!contactByID) {
    return null;
  }
  return contactByID;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactByID = data.find((elem) => elem.id === contactId);
  if (!contactByID) return null;
  const removedContact = data.filter((el) => el.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(removedContact));
  return contactByID;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(data));
  return newContact;
}

async function updateContact(contactId, body) {
  const allContacts = await listContacts();
    let contactByID = null;
    const newContacts = allContacts.map((item) => {
        if (item.id === contactId) {
            item = { id: contactId, ...body };
            contactByID = item;
        }
        return item;
    });
    if (!contactByID) {
        return null;
    }
    await fs.writeFile(contactPath, JSON.stringify(newContacts));
    return contactByID;
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
