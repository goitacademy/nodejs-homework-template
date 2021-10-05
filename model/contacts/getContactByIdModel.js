const Contact = require('../../schemas/contacts')

const getContactByIdModel = async (contactId) => {
  try {
    const contact = await Contact.findById({ _id: contactId })
    return contact
  } catch {
    throw new Error('404')
  }
}

module.exports = getContactByIdModel
