
// const contacts = require("../models/contacts");

const {Contact} = require("../models/contact")

const { HttpError,ctrlWrapper } = require("../helpers/");
// const { ctrlWrapper } = require("../helpers")


const listContacts = async (req, res) => {
  const { _id: owner } = req.user; //індив. збережена інф. корист
  
  const {page = 1, limit = 10, favorite } = req.query; //параметри пошуку
  const skip = (page - 1) * limit;

  const result = await Contact.find({owner,favorite: favorite ?? [true, false]},
    null,
    {skip, limit}).populate("owner", "_id email subscription");
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
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