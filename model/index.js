const Contact = require('./schemas/contact')

const listContacts = async () => {
  try {
    const contacts = await Contact.find()
    return contacts
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

const getContactById = async contactId => {
  try {
    const contact = await Contact.findById(contactId)
    return contact
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

const addContact = async body => {
  try {
    const contact = await Contact.create(body)
    return {
      data: contact,
    }
  } catch (error) {
    console.log(`Error: ${error.message}`)
    return {
      message: error.message,
    }
  }
}

const removeContact = async contactId => {
  try {
    const contact = await Contact.findByIdAndDelete(contactId)
    return contact
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, body, { new: true })
    return contact
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
