const { v4 } = require('uuid');
const fs = require('fs/promises');
const getAll = require('./getAll');
const contactsPath = require('../../contactsPath');

const add = async ({ name, email, phone }) => {
  const data = await getAll();
  const newContact = { id: v4(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
};

module.exports = add;
