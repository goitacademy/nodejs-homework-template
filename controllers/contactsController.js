import Contact from '../models/contact.js';
import { controllerWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

// ####################################################

const notFoundMsg = 'Could not find contact with the requested id';

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name, email');

  res.json(result);
};

const getById = async ({ params: { id } }, res) => {
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async ({ params: { id } }, res) => {
  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const updateById = async ({ params: { id } }, res) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
    // runValidators: true,
  });
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const updateStatusContact = async ({ body, params: { id } }, res) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
    // runValidators: true,
  });
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

// ####################################################

export default {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
