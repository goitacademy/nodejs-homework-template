const Contact = require('../../schemas/contacts')
const phoneNumberFormatter = require('../../utils/phoneNumberFormatter')

const changeContactModel = async (contactId, body) => {
  try {
    if (body.phone) {
      body.phone = phoneNumberFormatter(body.phone)
    }
    const contact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: false }
    )
    return contact
  } catch {
    throw new Error('404')
  }
}

module.exports = changeContactModel
