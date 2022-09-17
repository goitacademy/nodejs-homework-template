const contactsServices = require ('../services/contactsServices')
const contactsSchemas = require('../schemas/contactsSchemas')

const listContacts = async (req, res ) => {
  try {
    const contacts = await contactsServices.getAll()
    res.json(contacts)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getContactById = async (req, res ) => {
  const { contactId } = req.params

  try {
    const contact = await contactsServices.getById(contactId)
    
    return contact
        ? res.json(contact)
        : res.status(404).json({ message: 'Not found' })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const addContact = async (req, res ) => {
  const {error, value: contactData} = contactsSchemas.addContact.validate(req.body)

  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const newContact = await contactsServices.createNew(contactData)
    res.status(201).json(newContact)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const removeContact = async (req, res ) => {
  const { contactId } = req.params

  try {
    const status = await contactsServices.deleteById(contactId)
    
    return status
        ? res.json({ message: "Contact deleted" })
        : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateContact = async (req, res) => {
  const {contactId} = req.params
  const {error, value: contactData} = contactsSchemas.updateContact.validate(req.body)

  if (error) return res.status(400).json({message: error.details[0].message})
  
  try {
    const updatedContact = await contactsServices.updateById(contactId, contactData)

    return updatedContact
        ? res.json(updatedContact)
        : res.status(404).json({ message: 'Not found' })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {listContacts, getContactById, addContact, removeContact, updateContact}