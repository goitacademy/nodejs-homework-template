const fs = require('fs/promises');
const getAll = require('./getAll');
const contactsPath = require('../../contactsPath');

const updById = async (id, contact, body) => {
  const contacts = await getAll();
  const newContact = { ...contact, ...body };
  const data = contacts.filter(el => el.id !== id);
  data.push(newContact);
  // console.log(data);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

module.exports = updById;
