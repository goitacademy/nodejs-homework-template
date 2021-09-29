const fs = require('fs/promises');
const { listContacts } = require('./listContacts');
const path = require('path');
const { json } = require('express');

const contactsPath = path.join(__dirname, '../../model/contacts.json');

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const idPos = data.findIndex(item => String(item.id) === String(contactId));
    if (idPos > 0) {
      data[idPos] = { ...data[idPos], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(data));
      
      return data[idPos];
    }

    return json({ "message": "Not found" });

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  updateContact
}