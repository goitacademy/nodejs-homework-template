const {Contact} = require('../models/contact');
const HttpError = require('../helpers/HttpError');
const {ctrlWrapper} = require('../helpers/ctrWrapper');

  const getAllContacts = async (req, res) => {
      const result = await Contact.find();
      res.json(result);
  }

  const getContactById = async (req, res) => {
    
       const {id}  = req.params;
       const result = await Contact.findById(id);
       if(!result){
         throw HttpError (404, 'Not found');
       }
        res.json(result);
    }
  
   const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
    }

  const deleteContactById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if(!result){
      throw HttpError (404, 'Not found')
    }
    res.json({
      message:'Delete success'
    })
  }
  
  const updateContact = async (req, res) => {
    const{id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body,{new:true});
    if(!result){
     throw HttpError(404, 'Not found');
    }
    res.json(result);
   }

   const updateFavorite = async (req, res) => {
    const{id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body,{new:true});
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
    updateFavorite: ctrlWrapper(updateFavorite),
  }