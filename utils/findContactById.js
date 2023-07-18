const fs = require('fs/promises');

const findContactById = async (contactId, path) => {
  try {
    const contacts = JSON.parse(await fs.readFile(path));
    const findedContact = contacts.find((contact) => contact.id === contactId);

    return findedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = findContactById;
