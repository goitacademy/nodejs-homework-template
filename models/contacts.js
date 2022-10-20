const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "contacts.json");

console.log(contactsPath);

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    console.error(error.message);
  }
};

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    contacts.map((element) => {
      if (Number(element.id) === contactId) {
        console.log(element);
        return element;
      }
    })
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    // contacts.filter(element => Number(element.id) === contactId);
    contacts.splice(contactId - 1, 1);
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const lastElementIndex = contacts.length + 1;
    contacts.push({
      id: `${lastElementIndex}`,
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`
    })
  } catch (err) {
    console.error(err.message);
  }
}

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
