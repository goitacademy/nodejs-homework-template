const { Contact } = require('../models')

const getAllContacts = async () => { return await Contact.find({}) }

const writeContact = async (contact) => { await Contact.create(contact) }

const listContacts = async (req, res) => {
  try {
    const allContacts = await getAllContacts()
    if (allContacts.length !== 0) {
      return res.status(200).json(allContacts);
    }
    return null
  } catch (error) {
    console.error('ERROR listContacts:', error.message)
  }
}

const getContactById = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id) // findOne({_id;id})
    return res.json(contact);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Contact not found. Check you id` })
  }
}

const removeContact = async (req, res) => {
  try {
    const allContacts = await getAllContacts()
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id)
    if (result.length === allContacts.length) {
      return res.status(404).json({ message: `contact ${id} not found` })
    }
    res.status(200).json({ message: `contact ${id} deleted` })
  } catch (error) {
    console.log('removeContact', error.message)
    return res
      .status(404)
      .json({ message: `Contact not found. Check you id` })
  }
}

const addContact = async (req, res) => {
  try {
    const body = req.body
    await writeContact(body)
    res.status(201).json(body)
  } catch (error) {
    console.log('addContact', error.message)
  }
}

const updateContactFull = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    await writeContact(contact)
    res.status(200).json(contact)
  } catch (error) {
    res.status(404)
      .json({ message: `Contacts not found. Check you id` })
    console.log('updateContact', error.message)
  }
}

const updateContactPartial = async (req, res) => {
  try {
    const { name, email, phone, favorite } = req.body
    const { id } = req.params
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contacts with id '${id}' not found` })
    } else {
      if (name) { contact.name = name }
      if (email) { contact.email = email }
      if (phone) { contact.phone = phone }
      if (favorite) { contact.favorite = favorite }
    }
    await writeContact(contact)
    res.status(200).json(contact);
  } catch (error) {
    console.log('updateContact', error.message)
  }
}

const updateFavoriteStatus = async (req, res) => {
  try {
    const { favorite } = req.body
    const { id } = req.params
    console.log(favorite)
    const contact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
    console.log(contact)
    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contacts with id '${id}' not found` })
    } else {
      if (favorite) { contact.favorite = favorite }
    }
    // await writeContact(contact)
    res.status(200).json(contact);
  } catch (error) {
    console.log('updateFavoriteContact', error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactFull,
  updateContactPartial,
  updateFavoriteStatus
}
