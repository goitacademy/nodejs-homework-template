const {Contact} = require('../models/contact');
const {HttpError, ctrlWrapper} = require('../helpers');

const getAll = async (req, res) => {
  const { favorite } = req.query; 
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate('owner', 'email');

  res.status(200).json(result);
};

const getById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
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
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    res.status(200).json(result);
}

const updateStatusContact = async (req, res) => {
  if(!req.body) { 
    throw HttpError(400, "missing field favorite")
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