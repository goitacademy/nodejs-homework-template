const Contact = require('../../schemas/Contact')

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { getContactById }
