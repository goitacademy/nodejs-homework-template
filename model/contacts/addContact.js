const { ContactModel } = require('../../db/contactModelMongoose')

const addContact = async (name, email, phone) => {
  const newContact = await ContactModel.create({ name, email, phone })
  return newContact
}

module.exports = addContact
