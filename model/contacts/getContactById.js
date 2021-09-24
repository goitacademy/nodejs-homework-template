const getAll = require('./getAll.js')
// const contactsOperations = require('../../model')
// const contactsOperations = require('../../model')
// const contactsOperations = require('../../model')

async function getContactById(contactId) {
  try {
    // console.log(contactsOperations.getAll())
    const contacts = await getAll()
    const contact = contacts.find((contact) => String(contact.id) === contactId)
    // `Contact ID${contactId} not found`
    if (!contact) {
      return null
    }
    // console.table(contact)
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

// const getContactById = async (contactId) => {
//   // try {
//   const contacts = await getAll()

//   const contact = contacts.find((contact) => contact.contactId)

//   if (!contact) {
//     return null
//   }
//   // console.log(contact)
//   return contact
//   // } catch (error) {
//   // console.log(error.message)
// }
// // }
module.exports = getContactById
