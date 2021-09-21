const { getContacts, updateContacts } = require('./getContacts')

const updateContactById = async (id, data) => {
  try {
    const contacts = await getContacts()
    const idx = contacts.findIndex((cont) => String(cont.id) === String(id))
    if (idx === -1) {
      return
    }
    const updateContact = { ...contacts[idx], ...data }
    contacts[idx] = updateContact
    await updateContacts(contacts)
    return updateContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateContactById,
}