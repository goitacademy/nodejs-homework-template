const model = require('../../model/contacts')

const getContactById = async (userId, contactId) => {
  try {
    const data = await model
      .findById({ _id: contactId, owner: userId })
      .populate({ path: 'owner', select: 'email subscription -_id' })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getContactById