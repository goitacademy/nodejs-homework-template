const Contact = require('../models/contact')
const { HttpError } = require('../helpers');
const ctrlWrapper = require('../helpers/ctrlWrapper')


async function getAll(req, res) {
    const result = await Contact.find();
    res.json(result)
}

async function getById(req, res, next) {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json(result)
}

async function addContact(req, res, next) {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

async function removeById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json({message: "Contact deleted"})
}

async function updateById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.status(200).json(result);
}


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};