
const readFile = require('./readFile')

const listContacts = async () => {
  try {
    return await readFile()
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = listContacts