const {Contact} = require("../models/contact");

const {HttpError, ctrlWrapper} = require("../helpers");



  const listContacts = async (req, res, next) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
      const result = await Contact.find({owner}, "-createdAt -updatedAt",{skip, limit});
   res.json(result);
  }
  const getContactById =  async (req, res, next) => {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);
      if(!result) { 
       throw HttpError(404, "Not Found");
      }
      res.json(result);
  }
  const addContact = async (req, res, next) => {
    const {_id: owner} = req.user;
     const result = await Contact.create({...req.body, owner});
     res.status(201).json(result); 
    }
    const removeContact = async (req, res, next) => {
         const {contactId} = req.params;
         const result = await Contact.findByIdAndDelete(contactId);
         if(!result) {
           throw HttpError(404, "Not found");
         }
         res.json({
           message: "contact deleted"
         })
       }
       const updateContact = async (req, res, next) => {
         const {contactId} = req.params;
         const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
         if(!result) {
           throw HttpError(404, "Not found");
         }
         res.json(result);
       }

       const updateFavorite = async (req, res, next) => {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if(!result) {
          throw HttpError(404, "Not found");
        }
        res.json(result);
      }

  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
  }