import Contact from '../../models/contact.js';
import { controllerWrapper } from '../../decorators/index.js';

const notFoundMsg = 'Could not find contact with the requested id';

// ####################################################

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async ({ params: { id } }, res) => {
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
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

export default {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
