const fs = require('fs').promises
const path = require('path')
const { randomUUID } = require('crypto')



const { Contact } = require('../models')

const contactsPath = path.join(__dirname, '../db/contacts.json')

const getAllContacts = async () => {
  // return JSON.parse(await fs.readFile(contactsPath, "utf-8"))
  return await Contact.find({})
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
  const { id } = req.params
  const contact = await Contact.findById(id) // findOne({_id;id})
  // if (!mongoose.Types.ObjectId.isValid(id)) return false;
  // console.log('CONTACT ERROR', contact.options)

  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact with id '${id}' not found` });
  }
  res.json(contact);
}

const removeContact = async (req, res) => {
  try {
    const allContacts = await getAllContacts()
    const { id } = req.params;
    const contact = allContacts.filter((contact) => contact.id !== String(id));
    if (contact.length === allContacts.length) {
      return res.status(404).json({ message: `contact ${id} not found` })
    }
    await writeContact(contact);
    res.status(200).json({ message: `contact ${id} deleted` });
  } catch (error) {
    console.log('removeContact', error.message);
  }
}

const addContact = async (req, res) => {
  try {
    const body = req.body
    const allContacts = await getAllContacts()
    const newContact = { id: randomUUID(), ...body }
    allContacts.push(newContact)
    await writeContact(allContacts)
    res.status(201).json(allContacts)
  } catch (error) {
    console.log('addContact', error.message);
  }
}

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const allContacts = await getAllContacts()
    const { id } = req.params;
    const contact = allContacts.find(contact => contact.id === id)
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contacts with id '${id}' not found` });
    } else {
      if (name) { contact.name = name }
      if (email) { contact.email = email }
      if (phone) { contact.phone = phone }
    }

    await writeContact(allContacts)
    res.status(200).json(contact);
  } catch (error) {
    console.log('updateContact', error.message);
  }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
