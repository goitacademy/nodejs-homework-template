const fs = require('fs/promises')
const path = require('path')

const pathContacts = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const response = await fs.readFile(pathContacts);
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const response = await listContacts();
    const findContactById = response.find(
      (el) => el.id.toString() === contactId
    );
    return findContactById;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const response = await listContacts();
    const filterElements = response.filter(
      (el) => el.id.toString() !== contactId
    );
    fs.writeFile(pathContacts, JSON.stringify(filterElements, null, 2));
    return filterElements;
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
