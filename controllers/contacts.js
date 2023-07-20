
// const contacts = require("../models/contacts");

const {Contact} = require("../models/contact")

const { HttpError } = require("../helpers/");
const { ctrlWrapper } = require("../helpers")


const listContacts = async (req, res) => {

  const result = await Contact.find();
  res.json(result);
}

const getById = async (req, res) => {

  const {id} = req.params;
  const result = await Contact.findById(id);
    if(!result) {
      throw HttpError (404, "Not found");
    }
  res.json(result);
}

const addContact = async (req, res) => {

  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

const deleteById = async (req, res) => {

      const {id} = req.params;
      const result = await Contact.findByIdAndDelete(id);
      if(!result) {
        throw HttpError (404, "Not found");
      }
        res.status(200).json({message:"contact deleted"});
  
}

const updateContact = async (req, res) => {

  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result);

  }

const updateFavorite = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!result) {
      throw HttpError(404, "Not found");
  }
  res.json(result);
};


  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteById: ctrlWrapper(deleteById),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),

  }