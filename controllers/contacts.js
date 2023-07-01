const { HttpError, decorator } = require('../helpers');
const { contactsScheme } = require('../schemes');

const { contact } = require('../models');

const getAll = async (req, res, next) => {
  const result = await contact.find();
  res.json(result);
}
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const resolt = await contact.findById(contactId);
  if(!resolt){
    throw new HttpError({status: 400, message:"Not found"});
  }
  res.json(resolt);
}
const addById = async (req, res, next) => {
  const { value, error } = contactsScheme.validate(req.body);
  if(error){
    throw new HttpError({status: 400, message:"missing required name field"});
  }
  const resolt = await contact.create(value);
  res.json(resolt); 
}
const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const resolt = await contact.findByIdAndDelete(contactId);
  if(!resolt){
    throw new HttpError({status: 404, message:"Not found"});
  }
  res.json({ message: "contact deleted" })
}
const updateBuId = async (req, res, next) => {
  const { contactId } = req.params;
  const { value, error } = contactsScheme.validate(req.body);
  if(error){
    throw new HttpError({status: 400, message:"missing fields"});
  }
  const resolt = await contact.findByIdAndUpdate(contactId, value, { new: true });
  if(!resolt){
    throw new HttpError({status: 404, message:"Not found"});
  }
  res.json(resolt);
}
const updateFavoriteById = async(req, res, next) => {

}

module.exports = {
    getAll : decorator(getAll),
    getById : decorator(getById),
    addById : decorator(addById),
    deleteById : decorator(deleteById),
    updateBuId : decorator(updateBuId),
    updateFavoriteById: decorator(updateFavoriteById),
}