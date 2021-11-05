const Contact = require('../../schemas/Contact')

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { removeContact }
