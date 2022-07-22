const {Schema, model} = require('mongoose')

const constactsSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false})

<<<<<<< Updated upstream
const listContacts = async () => {
    return await db.read()
}

const getContactById = async (contactId) => {
    const contacts = await db.read()
    const [contact] = contacts.filter((contact) => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
    const contacts = await db.read()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if(index !== -1) {
      const [result] = contacts.splice(index, 1)
      await db.write(contacts)
      return result
    }
    return null}

const addContact = async (body) => {
    const contacts = await db.read()
    const newContact = {
    id: crypto.randomUUID(),
    ...body
  }
  contacts.push(newContact)
  await db.write(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
    const contacts = await db.read()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if(index !== -1) {
        const contact = contacts[index]
        contacts[index] = {...contact, ...body}
        await db.write(contacts)
        return contacts[index]
    }
    return null
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
=======
  const Contacts = model('contacts', constactsSchema)
  
  module.exports = Contacts
>>>>>>> Stashed changes
