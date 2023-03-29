const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join('models', 'contacts.json');

const listContacts = async () => {
  try {
     const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

      return contacts;
} catch (err) {
   console.log(err)
}
}

module.exports = {
 listContacts
}
