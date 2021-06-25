const { Contact } = require('../db/contactModel')

const listContacts = async () => {
  try {
    const contacts = await Contact.find({})
    return contacts
  } catch (err) {
    console.error(err)
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId)
    return contact
  } catch (err) {
    console.error(err)
  }
}
async function addContact(name, email, phone, favorite) {
  try {
    const contact = new Contact({ name, email, phone, favorite })
    await contact.save()
    return contact
  } catch (err) {
    console.error(err)
  }
}

async function removeContact(contactId) {
  try {
    const deleteContact = await Contact.findByIdAndDelete(contactId)
    console.log(deleteContact)
    return !!deleteContact
  } catch (err) {
    console.error(err)
  }
}
const updateContact = async (name, email, phone, favorite, id) => {
  try {
    await Contact.findByIdAndUpdate(id, {
      $set: { name, email, phone, favorite },
    })
    const updatedContact = await getContactById(id)
    return updatedContact
  } catch (err) {
    console.error(err)
  }
}
const updateStatusContact = async (favorite, id) => {
  try {
    await Contact.findByIdAndUpdate(id, {
      $set: { favorite },
    })
    const updatedContact = await getContactById(id)
    return updatedContact
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
}
