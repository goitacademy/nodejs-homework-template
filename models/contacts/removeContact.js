import fs from 'fs/promises'
import contacts from '../../db/contacts.json'

const __filename = 'db/contacts.json'

const removeContact = async (contactId) => {
    const removedContact = contacts.find(contact => contact.id === contactId)
    contacts.forEach((el,i) => {if (el.id == contactId) contacts.splice(i, 1)
    })
    await fs.writeFile(__filename, JSON.stringify(contacts, null, 2))
    return removedContact
}
export default removeContact
