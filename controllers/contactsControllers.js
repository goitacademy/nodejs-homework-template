const contactSchema = require('../middlewares/validationMiddlewares')
const contacts = require("../models/contacts")
const {RequestError} = require('../helpers/errors')

const listContacts = async (req, res ) => {
  try {
    const allContacts = await contacts.listContacts()
    res.json(allContacts)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getContactById = async (req, res ) => {
  const { contactId } = req.params

  try {
    const contactById = await contacts.getContactById(contactId)
    
    return contactById
        ? res.json(contactById)
        : res.status(404).json({ message: 'Not found' })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const addContact = async (req, res ) => {
  const {error, value: contactData} = contactSchema.validate(req.body)

  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const newContact = await contacts.addContact(contactData)
    res.status(201).json(newContact)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const removeContact = async (req, res ) => {
  const { contactId } = req.params

  try {
    const status = await contacts.removeContact(contactId)
    
    return status
        ? res.json({ message: "Contact deleted" })
        : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    
    if (error) {
      throw RequestError(400, 'missing fields');
    }
    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);
    if (!result) {
      throw RequestError(404, 'Not found');
    }
    if (result) {
      return res.json(result)
    }
    
  } catch (error) {
    return  res.json(error);
}}

module.exports = {listContacts, getContactById, addContact, removeContact, updateContact}