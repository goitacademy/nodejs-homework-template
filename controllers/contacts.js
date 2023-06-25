const {Contact, addSchema}  = require('../models/contact'); 
const { HttpError } =require("../helpers/HttpError")
const { ctrlWrapper } = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const {contactId} = req.params; 
  const result = await Contact.findOne(contactId); 
  if(!result) { 
  throw HttpError(404, `Contact '${contactId}' Not found`)
}
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};


const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw  HttpError(404, "Not found");
  }
 
  res.status(200).json({ message: "contact deleted" });
};


const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw  HttpError(404, "missing fields");
  }
  const id = req.params.contactId;
  const result = await Contact.findIdAndUpdate(id, req.body);
  if (!result) {
    throw  HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw  HttpError(404, "missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findIdAndUpdate(contactId, req.body, {new:true});
  if (!result) {
    throw  HttpError(404, "Not found");
  }
  res.status(200).json(result);
};


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),

};
