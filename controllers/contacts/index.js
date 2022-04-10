const contactsRepository = require('../../repository/contact')

const listContacts = async (req, res, next) => {
    const contacts = await contactsRepository.listContacts()
    res.json({ status: 'success', code: 200, payload: {contacts} })
  }

  const getContactById = async (req, res, next) => {
    const contact = await contactsRepository.getContactById(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, payload: {contact} })
    }
    return res
    .status(404)
    .json({ status: 'error', code: 404, message:'Not found' })
  }
  
  const addContact = async (req, res, next) => {
    const contact = await contactsRepository.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, payload: {contact} })
  }
  
  const removeContact = async (req, res, next) => {
    const contact = await contactsRepository.removeContact(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, message: 'Contact deleted' })
    }
    return res
    .status(404)
    .json({ status: 'error', code: 404, message:'Not found' })
  }
  
  const updateContact = async (req, res) => {
    const contact = await contactsRepository.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({ status: 'success', code: 200, payload: {contact} })
    }
    return res
    .status(404)
    .json({ status: 'error', code: 404, message:'Not found' })
  }

  const updateStatusContact = async (req, res) => {
    const contact = await contactsRepository.updateContact(req.params.contactId, req.body)
    
    if (req.body.favorite === undefined) {
        return res.json({status: 'error', code: 400, message: 'missing field favorite'})
    } else
    if (contact) {
      return res.json({ status: 'success', code: 200, payload: {contact} })
    }
    return res
    .status(404)
    .json({ status: 'error', code: 404, message:'Not found faboti' })
  }
  
 module.exports = {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact}