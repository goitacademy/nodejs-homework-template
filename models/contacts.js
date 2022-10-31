const fs = require('fs/promises')
const path = require('path');
const uuid = require('react-uuid');
const dbPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
  const nonParsedData = await fs.readFile(dbPath, 'utf-8')
  const parsedData = JSON.parse(nonParsedData)
  return parsedData;
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  return data.find(element => element.id === contactId.toString())
}

const removeContact = async (contactId) => {
  const list = await listContacts()
  const res = list.filter(i => i.id !== contactId.toString())
  if (list && list.length === res.length) {
    return false
  }
  else {
    await fs.writeFile(dbPath, JSON.stringify(res))
    return true
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    if (!body || !email || !phone) return null
    else {
      const result = { id: uuid(), name, email, phone }
      const list = await listContacts()
      list.push(result)
      await fs.writeFile(dbPath, JSON.stringify(list))
      return list
    }
  } catch (error) {
    console.error(error.message)
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const list = await listContacts();
  const item = list.find(i => i.id === contactId);
  if (!item) return;
  if (name) item.name = name;
  if (email) item.email = email;
  if (phone) item.phone = phone;
  await fs.writeFile(dbPath, JSON.stringify(list));
  return item;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

