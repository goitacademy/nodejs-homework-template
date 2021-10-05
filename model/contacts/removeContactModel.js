const Contact = require('../../schemas/contacts')

const removeContactModel = async (contactId) => {
  try {
    const contact = await Contact.findByIdAndDelete({ _id: contactId })
    return contact
  } catch {
    throw new Error('404')
  }
}

module.exports = removeContactModel
