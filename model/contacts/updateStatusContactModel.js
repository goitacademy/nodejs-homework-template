const Contact = require('../../schemas/contacts')

const updateStatusContactModel = async (contactId, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: body },
      { new: true }
    )
    return contact
  } catch {
    throw new Error('404')
  }
}

module.exports = updateStatusContactModel
