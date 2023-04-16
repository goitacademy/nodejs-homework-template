const {Contact} = require('../models')

const listContacts = async (req, res) => {
 
  const contacts = await Contact.find()
  
  res.status('200').json(contacts)
}
  
const getContactById = async (req, res) => {

  const contact = await Contact.findById(req.params.contactId)

  if (!contact) {
    res.status(404).json({ "message": "Not found" })
    return
  }

  res.status(200).json(contact)
}
  

const removeContact = async (req, res) => {
  
  const contact = await Contact.findByIdAndDelete(req.params.contactId);

  if (!contact) {
    res.status(404).json({ 'message': 'not found' })
    return
  }

  res.status(200).json({ 'message': 'contact deleted' })
}
  
const addContact = async (req, res) => {

  const newContact = await Contact.create(req.body)

    res.status(201).json(newContact)  
}
  
const updateContact = async (req, res) => {
     
    const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body,  { new: true });

    if (!updatedContact) {
      res.status(404).json({ 'message': 'not found' })
      return
    }

    res.status(200).json(updatedContact) 
}

const updateStatusContact = async (req, res) => {

  const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, {favorite: req.body.favorite},  { new: true });
  
  if (!updatedContact) {
    res.status(404).json({ 'message': 'not found' })
    return
  }

  res.status(200).json(updatedContact) 
}
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
  }
  