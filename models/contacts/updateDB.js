// created by Irina Shushkevych
const file = require('fs/promises')

const pathName = require('./getPathName')

const updateDB = async (data) => {
  await file.writeFile(pathName, JSON.stringify(data))
}

module.exports = updateDB
