const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "contact.json");

console.log(contactsPath);

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    const parseResult = JSON.parse(result);
    console.log(parseResult)
    return parseResult;
  } catch (error) {
    console.error(error.message);
  }
};

 const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    // contacts.filter(element => Number(element.id) === contactId);
    contacts.splice(contactId - 1, 1);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const lastElementIndex = contacts.length + 1;
    contacts.push({
      id: `${lastElementIndex}`,
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`
    })
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
      return null;
    }
   
    contacts[index] = { id: contactId, ...body };
  
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
 }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
