const { getContacts, updateContacts } = require('./getContacts')



const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const idx = contacts.findIndex(contact => String(contact.id) === String(contactId))
    if (idx === -1) {
      return /* null */
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    console.table(contacts)
    return "Success remove"


  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    removeContact
}