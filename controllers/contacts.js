const {Contact, schemas} = require("../models/contact")

const {HttpError, ctrlWrapper} = require("../helpers");

const getAllContacts =  async (req, res) => {
    const result = await Contact.find();
     res.json(result);
   };

   const getContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result)
   };

   const addContact = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
  };

  const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result)
  };

  const updateContact = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result);
  };

  const updateFavorite = async (req, res) => {
    const {error} = schemas.updateFavoriteSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result);
  };

   module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
   }