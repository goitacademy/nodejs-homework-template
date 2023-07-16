const { nanoid } = require("nanoid");
const { readFileContacts, writeFileContacts } = require("../utils/contacts.util")

const listContacts = async () => {
  const listContacts = await readFileContacts()

  return listContacts
}

const getById = async (contactId) => {
  const list = await readFileContacts()
  const contact = list.find(({ id }) => id === contactId)

  return contact ?? null
}

const removeContact = async (contactId) => {
  const list = await readFileContacts()
  let result = null
  const filteredContacts = list.filter((item) => {
    if (item.id !== contactId) {
      return true
    }
    result = item

    return false
  })

  await writeFileContacts(filteredContacts)

  return result
}

const addContact = async ({ name, email, phone }) => {
  const list = await readFileContacts()
  const newContact = { id: nanoid(), name, email, phone }

  list.push(newContact)
  await writeFileContacts(list)

  return newContact
}

const updateContact = async (contactId, { name, email, phone }) => {
  const list = await readFileContacts()
  const contactIndex = list.findIndex(({ id }) => id === contactId)

  if (contactIndex === -1) return null;

  const updatedContactData = { contactId, name, email, phone }

  list[contactIndex] = updatedContactData;

  await writeFileContacts(list)

  return list[contactIndex]
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
