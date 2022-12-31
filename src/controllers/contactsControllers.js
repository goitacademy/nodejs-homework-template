const {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
} = require('../services/contactsService')

const getContactsController = async (_, res, next) => {
    const contacts = await getContacts()
    res.json({contacts})
}

const getContactByIdController = async (req,res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId)
    if (!contact) {
        return res.status(404).json({"message": "Contact not found"})
    }
    res.json({contact})
}
  
const removeContactController = async (req, res) => {
    const { contactId } = req.params;
    const contactDelete = await removeContact(contactId)
    if (!contactDelete) {
        return res.status(404).json({"message": "Contact not found"})
    }
    res.json({"message": "contact deleted"})
}

const addContactController = async (req, res, next) => {
    const newContact = await addContact(req.body)
    res.status(201).json({newContact})
}

const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contactUpdate = await updateContact(contactId, req.body)
    if (!contactUpdate) {
        return res.status(404).json({"message": "Contact not found"})
    } 
    res.json({contactUpdate})
}
 
const updateStatusContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contactUpdateStatus = await updateStatusContact(contactId, req.body)
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