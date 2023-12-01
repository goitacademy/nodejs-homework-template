const contacts = require ('../models/contacts');
const HttpError = require('../helpers/HttpError');
const {ctrlWrapper} = require('../helpers/ctrWrapper');

  const getAllContacts = async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);
  }

  const getContactById = async (req, res) => {
    
       const {id}  = req.params;
       const result = await contacts.getContactById(id);
       if(!result){
         throw HttpError (404, 'Not found');
       }
        res.json(result);
    }
  
   const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    }

  const deleteContactById = async (req, res) => {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result){
      throw HttpError (404, 'Not found')
    }
    res.json({
      message:'Delete success'
    })
  }
  
  const updateContact = async (req, res) => {
    const{id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result){
     throw HttpError(404, 'Not found');
    }
    res.json(result);
   }

  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContact: ctrlWrapper(updateContact),
  }