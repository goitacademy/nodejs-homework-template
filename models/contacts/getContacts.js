// created by Irina Shushkevych
const file = require('fs/promises')
const pathName = require('./getPathName')

const getContacts = async () => {
  const data = await file.readFile(pathName, 'utf8')
  return JSON.parse(data)
}

module.exports = getContacts
