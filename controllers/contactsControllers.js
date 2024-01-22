const contacts = require("../services/contactsServices");
const { HttpError, controllerWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
     const allContacts = await contacts.listContacts();
     res.json(allContacts)
};

const getOneContact = async (req, res) => { 
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404);
  }
  res.json(contactById) 
};

const deleteContact = async (req, res) => {
  const { contactId  } = req.params;
    const deleteContact = await contacts.removeContact(contactId)
    if (!deleteContact) {
      throw HttpError(404);
    }
  res.json(deleteContact) 
};

const createContact = async (req, res) => {
    const newContact = await contacts.addContact(req.body);    
    res.status(201).json(newContact)    
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contacts.updateContactById(contactId, req.body)
   if (!updatedContact) {
      throw HttpError(404);
  }   
  res.json(updatedContact)
 };

module.exports = {
    getAllContacts: controllerWrapper(getAllContacts),
    getOneContact: controllerWrapper(getOneContact),
    deleteContact: controllerWrapper(deleteContact),
    createContact: controllerWrapper(createContact),
    updateContact: controllerWrapper(updateContact)
}

