const {Contact} = require('../models/contact');
const {HttpError} = require('../helpers');
const {ctrlWrapper} = require('../helpers');
const {schemas} = require('../models/contact');

const getAll = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json(result);
}

const getById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

const add = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field")
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const remove = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"});
}

const update = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    res.status(200).json(result);
}

const updateStatusContact = async (req, res) => {
  if(!req.body) { 
    throw HttpError(400, "missing field favorite")
  }
  const {error} = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Not found")
  }
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.status(200).json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll), 
  getById: ctrlWrapper(getById), 
  add: ctrlWrapper(add), 
  remove: ctrlWrapper(remove), 
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact)
}