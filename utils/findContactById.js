const path = require('path');
const fs = require('fs/promises');

const contactsPath = path.join('models', 'contacts.json');

const findContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const findedContact = contacts.find((contact) => contact.id === contactId);

    return findedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = findContactById;
