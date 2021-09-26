const fs = require('fs/promises');
const contacts = require('../../model/contacts.json');
const {listContacts} = require('./index');

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const idPos = data.find(item => item.id === Number(contactId));

    if (idPos) {
      data[idPos] = { ...data[idPos], body };
      fs.writeFile(contacts, JSON.stringify(contacts));
      
      return JSON.parse(data[idPos]);
    }

    return json({ "message": "Not found" });

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  updateContact
}