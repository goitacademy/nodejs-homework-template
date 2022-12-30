// const { Contact } = require('../db/contactModel')
const {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
} = require('../services/contactsService')

// return ({}) or ()

const getContactsController = async (_, res, next) => {
    const contacts = await getContacts()
    res.json({contacts})
}

const getContactByIdController = async (req,res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId)
    // const contact = await Contact.findById(contactId)
    // if (!contact) return res.sendStatus(404) 

    res.json(contact)
}
  
const removeContactController = async (req, res) => {
    const { contactId } = req.params;
    await removeContact(contactId)
     // 
    res.json({"message": "contact deleted"})
}

const addContactController = async (req, res, next) => {
    const contact = await addContact(req.body)
    res.status(201).json(contact)
}

const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contactUpdate = await updateContact(contactId, req.body)
    // 1
    // const contactUpdate = await Contact.findByIdAndUpdate(contactId,
    //     { $set: req.body }, { new: true }) 
    // 2
    // const contactUpdate = await Contact.findByIdAndUpdate(contactId,
    //     req.body, { new: true }) 
    
    res.json(contactUpdate)
}
 
const updateStatusContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contactUpdateStatus = await updateStatusContact(contactId, req.body)
    res.json(contactUpdateStatus)
}

module.exports = {
    getContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController
}