const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join('models', 'contacts.json');

exports.getContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.writeContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
