// created by Irina Shushkevych
const file = require('fs/promises')
const path = require('path')

const pathName = path.join(__dirname, 'contacts.json')

const getContacts = async () => {
  const data = await file.readFile(pathName, 'utf8')
  return JSON.parse(data)
}

const getId = async () => {
  const data = await getContacts()
  const id = data.reduce((total, el) => Math.max(Number(el.id), total), 0) + 1
  return id.toString()
}

const updateContacts = async (data) => {
  await file.writeFile(pathName, JSON.stringify(data))
}

module.exports = { getContacts, getId, updateContacts }
