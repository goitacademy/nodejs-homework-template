const { ContactModel } = require('../../db/contactModel')
const { Conflict } = require('http-errors')

const addContact = async (name, email, phone, userId) => {
  const contact = await ContactModel.findOne({ name })
  if (!contact) {
    const newContact = await ContactModel.create({ name, email, phone, owner: userId })
    return newContact
  }
  throw new Conflict('Contact already exists')
}

module.exports = addContact
