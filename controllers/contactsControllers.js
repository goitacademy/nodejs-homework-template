const contacts = require("../services/contactsServices");
const { HttpError, controllerWrapper } = require("../helpers");
const { createContactSchema, updateContactSchema } = require("../schemas/contactsSchemas");

const getAllContacts = async (req, res, next) => {
     const allContacts = await contacts.listContacts();
     res.json(allContacts)
};

const getOneContact = async (req, res, next) => { 
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, "Not Found");
  }
  res.json(contactById) 
};

const deleteContact = async (req, res, next) => {
  const { contactId  } = req.params;
    const deleteContact = await contacts.removeContact(contactId)
    if (!deleteContact) {
      throw HttpError(404, "Not Found");
    }
  res.json(deleteContact) 
};

const createContact = async (req, res, next) => {
   const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);    
    res.status(201).json(newContact)    
};

const updateContact = async (req, res, next) => {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
  const { contactId  } = req.params;
    const updatedContact = await contacts.updateContactById(contactId, req.body)
     if (!updatedContact) {
      throw HttpError(404, "Not Found");
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
