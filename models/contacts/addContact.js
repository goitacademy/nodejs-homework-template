import fs from 'fs/promises'
import {randomUUID} from 'crypto'
import contacts from '../../db/contacts.json'

const __filename = 'db/contacts.json'

const addContact = async ({name, email, phone}) => {
    const newContact = { id: randomUUID(), name, email, phone}
    contacts.push(newContact)
    await fs.writeFile(__filename, JSON.stringify(contacts, null, 2))
    return newContact
  }

export default addContact
