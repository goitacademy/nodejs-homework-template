const {Contact} = require('../models/contact')
const {HttpError} = require('../helpers')
const ctrlWrapper = require('../helpers/ctrlWrapper')


const getAll = async (req, res) => {
  const result = await Contact.find({}, 'name phone email')
  res.json(result)
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json({message: "Create contact success"})
}

const deleteContact = async (req, res, next) => {
      const { contactId } = req.params
      const result = await Contact.findByIdAndDelete(contactId)
      if (!result) throw HttpError(404, "Not found")
      res.json({message: "Delete success"})
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite)
}