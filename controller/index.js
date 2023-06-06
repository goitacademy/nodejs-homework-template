const {Contact} = require('../schemas/contact');
const {HttpError} = require("../helpers/httpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const get = async (req, res, next) => {
    const results = await Contact.find()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    }) 
}

const getById = async (req, res, next) => {
  const { id } = req.params
    const result = await Contact.findById(id);
      if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Contact with ${id} not found`)
    }
}

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.create({ name, email, phone})
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, { name, email, phone }, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

const updateFavorite = async (req, res, next) => {
  const { id } = req.params
    const { error } = req.body;
  if (error) {
      throw HttpError(400, 'Missing required name field')
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

const remove = async (req, res, next) => {
  const { id } = req.params
    const result = await Contact.findByIdAndRemove({ _id: id })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

module.exports = {
  get: ctrlWrapper(get),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
  remove: ctrlWrapper(remove),
}
