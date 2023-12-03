const contacts = require('../models/contacts');
const HttpError = require('../helpers/HttpError');
const { ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {
     const result =await contacts.listContacts();
     res.json(result);  
  }

  const getById =async (req, res) => {
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId)
      if(!result){
        throw HttpError(404, "Not Found");
    }
      
      res.json(result);
    }


  const add = async (req, res) => {
   
    
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
    
  }

  const deleteById = async (req, res) => {
   
      const {contactId} = req.params;
      const result = contacts.removeContact(contactId);
      if(!result){
        throw HttpError(404, "Not Found");
    }
      res.status(200).json({
        message:"Contact deleted"
      }) 
    
  }

  const updateById = async (req, res) => {
     
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if(!result){
        throw HttpError(404, "Missing fields");
      }
      res.status(201).json(result);
    
  }

  module.exports= {
    getAll: ctrlWrapper(getAll),
    getById:ctrlWrapper(getById),
    add:ctrlWrapper(add),
    deleteById:ctrlWrapper(deleteById),
    updateById:ctrlWrapper(updateById)
  }