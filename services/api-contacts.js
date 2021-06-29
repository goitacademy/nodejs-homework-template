const { Contact } = require('../db/contactModel')

const getContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}
const findContactById = async contactId => {
  const contact = await Contact.findById(contactId)
  if (!contact) {
    return { message: 'No contact with such Id' }
  }
  return contact
}

const addNewContact = async body => {
  try {
    const { name, email, phone } = body
    const contact = new Contact({ name, email, phone })
    contact.save()
    return contact
  } catch (err) {
    console.error(err.message)
  }
}

const deleteContact = async contactId => {
  const result = await Contact.findById(contactId)
  console.log(result)
  if (!result) {
    return {
      status: 'error',
      code: 400,
      message: `No contact with ${contactId} ID `,
    }
  }
  console.log('starting delete')
  await Contact.findByIdAndDelete(contactId)
  return {
    status: 'success',
    code: 200,
    message: 'Contacts successfully removed',
  }
}

const modifyContact = async (contactId, body) => {
  try {
    const { favorite, name, email, phone } = body
    await Contact.findByIdAndUpdate(contactId, {
      $set: {
        favorite,
        name,
        email,
        phone,
      },
    })
    const contact = await findContactById(contactId)
    return contact
  } catch (err) {
    console.log(err.message)
  }
}

const updateFavStatus = async (contactId, body) => {
  const { favorite } = body
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })
  const newContact = await findContactById(contactId)
  return newContact
}

module.exports = {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  modifyContact,
  updateFavStatus,
}
