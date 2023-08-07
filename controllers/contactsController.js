import Contact from '../models/contact.js';
import { controllerWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import fs from 'fs/promises';
import path from 'path';

// ####################################################

const notFoundMsg = 'Could not find contact with the requested id';
const alreadyExistsMsg = 'A contact with this email already exists';

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...q } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner, ...q }, '-createdAt -updatedAt', {
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
  const { email } = req.body;
  const doesExist = await Contact.findOne({ email });
  if (doesExist) throw HttpError(409, alreadyExistsMsg);

  const { path: oldPath, filename } = req.file;
  const avatarPath = path.resolve('public', 'avatars');
  // C:\Users\dev0652\Documents\GitHub\node-rest-api\public\avatars
  const newPath = path.join(avatarPath, filename);

  await fs.rename(oldPath, newPath);
  const avatar = path.join('avatars', filename);
  // 'public' is omitted because a middleware in app.js already tells Express to look for static files in the 'public' folder

  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, avatar, owner });
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
