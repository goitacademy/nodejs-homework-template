const model = require('../../schemas/contacts')

const removeContact = async contactId => {
  try {
    const data = await model.findByIdAndRemove({ _id: contactId })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = removeContact