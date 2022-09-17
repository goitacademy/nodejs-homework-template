const fs = require('fs').promises
const path = require('path')
const { randomUUID } = require('crypto')

const contactsPath = path.join(__dirname, './contacts.json')
console.log('contacts.json', contactsPath)

const getAllContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"))
}

const writeContact = async (contact) => { await fs.writeFile(contactsPath, JSON.stringify(contact)) }

const listContacts = async (req, res) => {
  try {
    const allContacts = await getAllContacts()
    if (allContacts.length !== 0) {
      return res.status(200).json(allContacts);
    }
    return null
  } catch (error) {
    console.error('ERROR listContacts:', error.message);
  }
}

const getContactById = async (req, res) => {
  const allContacts = await getAllContacts()
  const { id } = req.params;
  const result = allContacts.find((contact) => contact.id === String(id));
  if (!result) {
    return res
      .status(404)
      .json({ message: `Contacts with id '${id}' not found` });
  }
  res.json(result);
}

const removeContact = async (req, res) => {
  const allContacts = await getAllContacts()
  const { id } = req.params;
  console.log(typeof (allContacts))
  const contact = allContacts.filter((contact) => contact.id !== String(id));
  try {
    await writeContact(contact);
    res.status(200).json({ message: `contact deleted` });
  } catch (error) {
    console.log('removeContact', error.message);
  }
}

const addContact = async (req, res) => {
  try {
    const body = req.body
    const allContacts = await getAllContacts()
    const newContact = { id: randomUUID(), ...body }
    console.log(typeof (allContacts))
    allContacts.push(newContact)
    await writeContact(allContacts)
    res.status(200).json({ allContacts })
  } catch (error) {
    console.log('addContact', error.message);
  }
}
// { name, email, phone }
const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
