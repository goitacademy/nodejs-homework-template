
import { ctrlWrapper } from '../decorators/index.js'
import { HttpError } from '../helpers/index.js'
import Contact from '../models/contacts.js';


const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -apdatedAt", { skip, limit });
  const total = await Contact.countDocuments({ owner });
  res.json({
    result,
    total
  });
}

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
}

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
  if (error) {
    throw HttpError(404);
  }
  res.json(result);
}

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate(id, { favorite: req.body.favorite }, { new: true });
  if (!result) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
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