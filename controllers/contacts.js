
const Contact = require('../models/contact.js')

const {HttpError, ctrlWrapper} = require('../helpers')

const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result)
  }

const getById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findById(id);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }

  const add = async (req, res) => {
      const result = await Contact.create(req.body);
      res.status(201).json(result)
  }

  const delById = async (req, res) => {
      const {id} = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if (!result) {
        throw HttpError(404,'Not found')
      }
      res.json({message: "contact deleted"})
  }

const updateById = async (req, res) => {
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw HttpError(404,'Not found')
      }
      res.json(result)
  }

  const updateFavorite = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404,'Not found')
    }
    res.json(result)
}


  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    delById: ctrlWrapper(delById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
  }