const Schemas = require("../Shemas/Shemas");
const {ctrlWrapper} = require("../utils/ctrlWrapper.js");
const Contact = require("../models/contacts-model.js");

const getAllContacts = async (req, res) => {
      const response = await Contact.find();
      res.json(response);
};

const getContactById = async (req, res) => {
      const response = await Contact.findById(req.params.contactId);
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json(response);
      };
};

const addContact = async (req, res) => {
      const {error} = Schemas.schemaAdd.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing required name field"});
      }
      else {
        const response = await Contact.create(req.body);
        res.status(201).json(response);
      }
};

const deleteContact = async (req, res) => {
      const response = await Contact.findByIdAndRemove(req.params.contactId);
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json({"message": "contact deleted"});
      };
};

const updateContact = async (req, res, next) => {
      const {error} = Schemas.schemaAdd.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing fields"});
      }
      else {
        const response = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true});
        if(response === null) next()
        else res.json(response);
      };
};

const updateStatusContact = async (req, res, next) => {
    const {error} = Schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
       throw res.status(400).json({"message": "missing fields favorite"});
    }
    else {
      const response = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true});
      if(response === null) next()
      else res.json(response);
    };
};


module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact), 
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};