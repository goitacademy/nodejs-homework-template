const { Contact } = require("../models/contact");
const {HttpError, ctrlWrapper} = require("../helpers/index");



const getAll = async (req, res) => {
  const result = await Contact.find();
  res.send(result);
};


const getById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findById(contactId);

  if(!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).send(result);
};


const addNewContact =  async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).send(result);
};


const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, "Contact was not found");
  };

  res.status(200).send({message: "contact deleted"});
};


const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!result) {
    throw HttpError(404, "Contact was not found");
  };

  res.status(200).send(result);
};


const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;

  const existingContact = await Contact.findById(contactId);

  if (!existingContact) {
    throw HttpError(404, "Contact was not found");
  }

  if (!req.body.favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  
  res.status(200).send(result);
};


module.exports = { 
  getAll: ctrlWrapper(getAll), 
  getById: ctrlWrapper(getById), 
  addNewContact: ctrlWrapper(addNewContact), 
  deleteById: ctrlWrapper(deleteById), 
  updateById: ctrlWrapper(updateById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};