import fs from 'fs/promises'

import contactsPath from './filePath.js'
import contactsOperations from './index.js'

async function removeContact(id) {
  try {
    const contacts = await contactsOperations.getAll()
    const removeContact = await contactsOperations.getContactById(id)
    const newContacts = contacts.filter((contact) => String(contact.id) !== id)

    if (!removeContact) {
      console.log(`Contact with such id=${id} cannot not found!`)
      return
    }

    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    console.log(
      `Contact with such id "${id}" was deleted! Please find below the updated list of contacts: `,
    )
    console.table(await contactsOperations.getAll())
    console.log('Success remove')
  } catch (error) {
    console.log(error.message)
  }
}

export default removeContact
