import fs from 'fs/promises'
import contacts from '../../db/contacts.json'

const __filename = 'db/contacts.json'

const updateContact = async (contactId, body) => {
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index !== -1) {
      const updatedContact = {id: contactId, ...contacts[index], ...body}
      contacts[index] = updatedContact
    await fs.writeFile(__filename, JSON.stringify(contacts, null, 2))
    return updatedContact
    }
    return null
}
export default updateContact
