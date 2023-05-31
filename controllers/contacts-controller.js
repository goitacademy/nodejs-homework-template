const contactsService = require("../models/contacts");
const {HttpError} = require("../helpers");
const {ctrlWrapper}= require("../decorators");




const getContacts = async (req, res) => {
    
      const contacts  = await contactsService.listContacts();
    res.json({result: contacts});
    
}
  const getContactById = async (req, res) => {
    
      const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId);
    if(!result){
      
      throw HttpError(404, `Contact with ${contactId} not found` )
    }
    res.json(result);
    
  
}

const addContact = async (req, res) => {
    
      
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result);
    
    
  }

  const updateContact = async (req, res) => {
    
      
      const {contactId} = req.params;
      const result = await contactsService.updateContact(contactId, req.body);
      if(!result){
        throw HttpError(404, `Contact with ${contactId} not found` ) 
      }
      res.json(result);
    
  
  
  }

  const removeContact = async (req, res, next) => {
    
      const {contactId} = req.params;
      const result = await contactsService.removeContact(contactId);
      if(!result){
        throw HttpError(404, `Contact with ${contactId} not found` ) 
      }
      res.status(204).json({
        message : `Contact with ID ${result.contactId} was deleted!`})
    
    
  }

  module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact)
  }