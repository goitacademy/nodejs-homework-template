const model = require('../../schemas/contacts')

const getContactById = async contactId => {
  try {
    const data = await model.findById({ _id: contactId })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getContactById