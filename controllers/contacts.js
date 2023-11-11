const contacts = require('../models/contacts')
const { HttpError,ctrlWrapper } = require('../helpers')



 const listContacts = async (req, res) => {
   const allContacts = await contacts.listContacts();
   res.json(allContacts)
}

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found')
    }
    res.json(result); 
  

}
const addContact = async (req, res) => {
  
     
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact)
  
}

const removeContact =async (req, res) => {

    const { contactId } = req.params;
    const deleteContact = await contacts.removeContact(contactId);
    if (!deleteContact) {
     throw HttpError(404, 'Not found')
    }
    res.json({
      mwssage:"Delete success"
    })

}

const updateContact = async (req, res, next) => {

  const { contactId } = req.params;
    const updateContact = await contacts.updateContact(contactId, req.body);
     if (!updateContact) {
      throw HttpError(404, 'Not found');
    }
  res.json(updateContact)

}

module.exports = {
    listContacts:ctrlWrapper(listContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    removeContact:ctrlWrapper(removeContact),
    updateContact:ctrlWrapper(updateContact)
}