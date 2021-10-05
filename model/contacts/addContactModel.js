const Contact = require('../../schemas/contacts')
const phoneNumberFormatter = require('../../utils/phoneNumberFormatter')

const addContactModel = async ({ name, email, phone }) => {
  try {
    const newContact = {
      name,
      email,
      phone: phoneNumberFormatter(phone)
    }
    const contact = await Contact.create(newContact)
    return contact
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = addContactModel
