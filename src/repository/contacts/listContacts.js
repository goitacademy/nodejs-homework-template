const model = require('../../schemas/contacts')

const listContacts = async () => {
  try {
    const data = await model.find()
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = listContacts