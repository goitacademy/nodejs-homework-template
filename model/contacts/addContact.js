const { Contact } = require('../../db/contactModel')
const { User } = require('../../db/userModel')

const addContact = async ({ name, email, phone, favorite, user }) => {
  await User.findById(user._id)

  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner: user._id
  })
  console.log(contact)
  await contact.save()
  return contact
}

module.exports = { addContact }
