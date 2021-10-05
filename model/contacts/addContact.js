const { Contact } = require('../../db/contactModel')

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite
  })
  await contact.save()
  return contact
}

module.exports = { addContact }
