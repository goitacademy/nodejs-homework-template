const { Contact } = require('../../db/contactModel')

const changeContact = async (contactId, body) => {
  await Contact.findByIdAndUpdate(contactId, { $set: body })
}

module.exports = { changeContact }
