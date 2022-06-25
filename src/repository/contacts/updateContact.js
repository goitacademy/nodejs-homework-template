const model = require('../../model/contacts')

const updateContact = async (userId, contactId, body) => {
  try {
    const data = await model.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      body,
      {
        new: true,
      },
    )
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateContact