const{
 listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts')

const { HttpError} = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
}

const getById = async (req, res, next) => {
     const contact = await getContactById(req.params.contactId);
     if(!contact) {
 throw HttpError(404, "Not found");
     }
     res.json(contact);
    
};

const addContactById = async (req, res, next) => {
     const newContact = await addContact(req.body);
     if(!newContact) {
        throw HttpError(404, "Not found");
     }
     res.status(201).json(newContact);
};

const deleteContactById = async (req, res, next) => {
    const deletedContact = await removeContact(req.params.contactId);
    if(!deletedContact) {
         throw HttpError(404, "Not found"); 
    }
    
       res.json({ message: "contact deleted" })
     
}

const updateContactById = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        throw HttpError(404, "missing fields"); 
    }
   
    
    const updatedContact = await updateContact(req.params.contactId, req.body);

    if (updatedContact === null) {
        throw HttpError(404, "Not found");
    }

    res.json(updatedContact);
}

module.exports = {
  getAll,
  getById,
  addContactById,
  deleteContactById,
  updateContactById,
};