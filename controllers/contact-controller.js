
import { ctrlWrapper } from '../decorators/index.js'
import { HttpError } from '../helpers/index.js'
import Contact from '../models/contacts.js';


const getAll = async (req, res) => {
  const result = await Contact.find({})
}

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
}

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (error) {
    throw HttpError(404);
  }
  res.json(result);
}

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, { favorite: req.body.favorite }, { new: true });
  if (!result) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'Contact deleted'
  })
}
export default {
  add: ctrlWrapper(add),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById)
}