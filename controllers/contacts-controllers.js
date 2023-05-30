const Schemas = require("../Shemas/Shemas");
const {ctrlWrapper} = require("../utils/ctrlWrapper.js");
const Contact = require("../models/contacts-model.js");

const getAllContacts = async (req, res) => {
      const {_id: owner} = req.user;
      const {page = 1, limit = 20, favorite} = req.query;
      const skip = (page - 1 ) * limit; 
      const response = await Contact.find(favorite ? {owner,favorite} : {owner}, "", {skip, limit});
      res.json(response);
};

const getContactById = async (req, res) => {
      const {_id: owner} = req.user;
      const { _id: contactId } = req.params;
      const response = await Contact.findOne({contactId, owner});
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json(response);
      };
};

const addContact = async (req, res) => {
      const {_id: owner} = req.user;
      const {error} = Schemas.schemaAdd.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing required name field"});
      }
      else {
        const response = await Contact.create({...req.body, owner});
        res.status(201).json(response);
      }
};

const deleteContact = async (req, res) => {
      const {_id: owner} = req.user;
      const { _id: contactId } = req.params;
      const response = await Contact.findOneAndRemove({contactId, owner});
      if(response === null){
        res.status(404).json({ message: 'Not found' })
      }
      else {
      res.json({"message": "contact deleted"});
      };
};

const updateContact = async (req, res, next) => {
      const {_id: owner} = req.user;
      const { _id: contactId } = req.params;
      const {error} = Schemas.schemaAdd.validate(req.body);
      if (error) {
        res.status(400).json({"message": "missing fields"});
      }
      else {
        const response = await Contact.findOneAndUpdate({contactId, owner},  req.body, {new: true});
        if(response === null) next()
        else res.json(response);
      };
};

const updateStatusContact = async (req, res, next) => {
    const {_id: owner} = req.user;
    const { _id: contactId } = req.params;
    const {error} = Schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
       throw res.status(400).json({"message": "missing fields favorite"});
    }
    else {
      const response = await Contact.findOneAndUpdate({contactId, owner}, req.body, {new: true});
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