const model = require('../../schemas/contacts')

const updateContact = async (contactId, body) => {
  try {
    const data = await model.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateContact