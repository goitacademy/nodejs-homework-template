const model = require('../../model/contacts')

const removeContact = async (userId, contactId) => {
  try {
    const data = await model.findByIdAndRemove({
      _id: contactId,
      owner: userId,
    })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}


module.exports = removeContact