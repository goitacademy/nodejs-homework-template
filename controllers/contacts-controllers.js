const {HttpError, ctrlWrapper} = require('../helpers')
const { Contact } = require("../models/Contact")

const getAll = async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query
  const { _id: owner } = req.user
  const skip = (page-1)*limit
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit });
  if (favorite) {
    const data = await Contact.find({favorite, owner }, "-createdAt -updatedAt", { skip, limit }).exec();
    return data.length? res.json(data) : res.status(300).json("the list is empty")  
  }
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
  const {_id: owner } = req.user
  const result = await Contact.create({ ...req.body, owner })
  console.log({ ...req.body, owner })
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