const model = require('../../schemas/contacts')

const addContact = async body => {
  try {
    const data = await model.create(body)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = addContact