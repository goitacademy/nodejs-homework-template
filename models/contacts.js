const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')
console.log('contacts.json', contactsPath)

const readAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8")
  const allContacts = JSON.parse(data)
  return allContacts
}

const listContacts = async (req, res) => {
  try {
    const allContacts = await readAllContacts()
    if (allContacts.length !== 0) {
      return res.status(200).json(allContacts);
    }
    return null
  } catch (error) {
    console.error('ERROR listContacts:', error.message);
  }
}

const getContactById = async (req, res) => {
  const allContacts = await readAllContacts()
  const { id } = req.params;
  const result = allContacts.find((contact) => contact.id === String(id));
  if (!result) {
    return res
      .status(400)
      .json({ status: `failure, contacts with id '${id}' not found` });
  }
  res.json(result);
}

// const removeContact = async (contactId) => { }

// const addContact = async (body) => { }

// const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
}
