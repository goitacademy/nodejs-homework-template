const readData = require('./readData')

const listContacts = async () => {
  return await readData()
}

module.exports = listContacts
