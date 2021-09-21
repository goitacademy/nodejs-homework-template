const { getContacts } = require('./getContacts')


const listContacts = async () => {
  try {
    const contacts = await getContacts()
    // console.table(contacts)
      return contacts
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    listContacts,
}