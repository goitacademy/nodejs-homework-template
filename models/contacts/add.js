const getAll = require('./getAll');
const { v4 } = require('uuid');
const updateContacts = require('./updateContacts');

const add = async (data) => {
  const contacts = await getAll();
  const newProduct = { ...data, id: v4() };
  contacts.push(newProduct);
  await updateContacts(contacts);
  return newProduct;
}

module.exports = add;