const Contact = require('../models/contact')
const { HttpError } = require('../helpers');
const ctrlWrapper = require('../helpers/ctrlWrapper')


async function getAll(req, res) {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    console.log(req.query);
      const result = await Contact.find({ owner }, '', {skip, limit}).populate('owner');
    res.json(result)
};

async function getById(req, res, next) {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json(result)
};

async function addContact(req, res, next) {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
};

async function removeById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json({message: "Contact deleted"})
};

async function updateById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.status(200).json(result);
};

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.status(200).json(result);
};

async function filterByStatus(req, res) {
  const { _id: owner } = req.user;
  const { favorite } = req.query;
  if (favorite === 'true') {
    const result = await Contact.find({ owner, favorite: true });
  res.json(result)
  };
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  filterByStatus: ctrlWrapper(filterByStatus),
};