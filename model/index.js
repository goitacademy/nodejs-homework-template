const fs = require('fs/promises')
const path = require('path');
const { nextTick } = require('process');
const { v4: uuid } = require('uuid')

const readData = async () => {
  const result = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8');
  return JSON.parse(result);
}

const listContacts = async () => {
  return await readData();
}
const getContactById = async (contactId) => {
  try {
    const data = await readData();
    const [correctId] = data.filter(el =>  el.id === contactId )
    return correctId;
  } catch (e) {
    nextTick(e);
  }
}
const removeContact = async (contactId) => {
  try {
    const data = await readData();
    const myContactById = await data.find(el => el.id === contactId);
    const correctId = data.filter(el => el.id !== contactId)
    await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(correctId));
    return myContactById;
  } catch (e) {
    nextTick(e);
  }
}
const addContact = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body
  }
  const data = await readData();
  data.push(record);
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data));
  return record;
}
const updateContact = async (contactId, body) => {
  try {
    const data = await readData();
    const [correctId] = data.filter(el => el.id === contactId);
    if (contactId) {
      Object.assign(correctId, body);
     await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(data));
    }
    return correctId
  } catch (e) {
    nextTick(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
