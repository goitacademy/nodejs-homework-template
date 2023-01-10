const {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
} = require('../services/contactsService')

const getContactsController = async (req, res) => {
    const { _id: userId } = req.user
    let {
        skip = 0,
        limit = 5,
        favorite
    } = req.query
    limit = limit > 5 ? 5 : limit

    const contacts = await getContacts(userId, favorite, skip, limit)
    res.json({contacts, skip, limit})
}

const getContactByIdController = async (req,res) => {
    const { contactId } = req.params;
    const {_id: userId} = req.user

    const contact = await getContactById(contactId, userId)
    if (!contact) {
        return res.status(404).json({"message": "Contact not found"})
    }
    res.json({contact})
}
  
const removeContactController = async (req, res) => {
    const { contactId } = req.params
    const { _id: userId } = req.user
    
    const contactDelete = await removeContact(contactId, userId)
    if (!contactDelete) {
        return res.status(404).json({"message": "Contact not found"})
    }
    res.json({"message": "contact deleted"})
}

const addContactController = async (req, res) => {
    const { _id: userId } = req.user
    const newContact = await addContact(req.body, userId)
    res.status(201).json({newContact})
}

const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const {_id: userId} = req.user
    const contactUpdate = await updateContact(contactId, req.body, userId)
    if (!contactUpdate) {
        return res.status(404).json({"message": "Contact not found"})
    } 
    res.json({contactUpdate})
}
 
const updateStatusContactController = async (req, res) => {
    const { contactId } = req.params;
    const {_id: userId} = req.user
    const contactUpdateStatus = await updateStatusContact(contactId, req.body, userId)
    if (!contactUpdateStatus) {
        return res.status(404).json({"message": "Contact not found"})
    }
    res.json({contactUpdateStatus})
}

module.exports = {
    getContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController
}