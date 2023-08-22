const {
listContacts,
getById,
addContact,
removeContact,
updateContact,
} = require("../../models/contacts"); 

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()

    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await getById(req.params.contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId)

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}; 

const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
}; 

const patchContact = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
}; 

module.exports = {
    getContacts,
    getContactById,
    deleteContact,
    addContacts,
    patchContact,
    
}