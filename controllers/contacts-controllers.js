const {HttpError, ctrlWrapper} = require('../helpers')
const { Contact } = require("../models/Contact")

const getAll = async (req, res, next) => {
  const data = await Contact.find();
  res.json(data);
}

const getById = async (req, res, next) => {
     const {contactId} = req.params;
    const data = await Contact.findById(contactId);
    if (!data) {
      throw HttpError(404,"Not Found")
    }
  res.json(data);
}

const add = async (req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json(result)
}

const updateById =  async (req, res, next) => {
    const {contactId} = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {new: true })
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    res.json(data)
}

const updateStatusContact =  async (req, res, next) => {
    const {contactId} = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {new: true })
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    res.json(data)
}

const deleteById = async (req, res, next) => {
    const {contactId} = req.params;
    const data = await Contact.findByIdAndDelete(contactId)
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    return res.json({message: 'contact deleted'})
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById)
}