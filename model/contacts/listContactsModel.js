const Contact = require('../../schemas/contacts')

const listContactsModel = async () => {
  try {
    const contacts = await Contact.find()
    return contacts
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = listContactsModel
